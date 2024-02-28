from flask import Flask, jsonify, request
#from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import pymysql
import dbcreds

# Define SQLAlchemy database connection URI
conn = "mysql+pymysql://{0}:{1}@{2}/{3}".format(dbcreds.dbuser, dbcreds.dbpass, dbcreds.dbhost, dbcreds.dbname)

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'key'
app.config['SQLALCHEMY_DATABASE_URI'] = conn
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable tracking modifications for better performance
db = SQLAlchemy(app)
#CORS(app)

# Define SQLAlchemy models

class User(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

class Team(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    user = db.relationship('User', backref=db.backref('teams', lazy=True))

class Player(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    team_id = db.Column(db.BigInteger, db.ForeignKey('team.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)

class Match(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    team_id = db.Column(db.BigInteger, db.ForeignKey('team.id'), nullable=False)
    player1 = db.Column(db.BigInteger, nullable=False)
    player2 = db.Column(db.BigInteger, nullable=False)
    setup_data = db.Column(db.JSON, nullable=False)
    team = db.relationship('Team', backref=db.backref('matches', lazy=True))

class MatchSet(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    match_id = db.Column(db.BigInteger, db.ForeignKey('match.id'), nullable=False)
    player1 = db.Column(db.BigInteger, nullable=False)
    player2 = db.Column(db.BigInteger, nullable=False)
    set_data = db.Column(db.JSON, nullable=False)
    match = db.relationship('Match', backref=db.backref('sets', lazy=True))

# Routes for adding items to respective tables

@app.route('/adduser', methods=['POST'])
def user_add():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    user = User(username=username, email=email)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User added successfully'}), 200

@app.route('/addteam', methods=['POST'])
def team_add():
    data = request.json
    team_name = data.get('team_name')
    email = data.get('email')

    user = User.query.filter_by(email=email).first()
    if user:
        team = Team(user=user, name=team_name)
        db.session.add(team)
        db.session.commit()
        return jsonify({'message': 'Team added successfully'}), 200
    else:
        return jsonify({'error': 'User not found'}), 404

@app.route('/addplayer', methods=['POST'])
def player_add():
    data = request.json
    player_name = data.get('player_name')
    team_id = data.get('team_id')

    team = Team.query.get(team_id)
    if team:
        player = Player(name=player_name, team=team)
        db.session.add(player)
        db.session.commit()
        return jsonify({'message': 'Player added successfully'}), 200
    else:
        return jsonify({'error': 'Team not found'}), 404

@app.route('/addmatch', methods=['POST'])
def match_add():
    data = request.json
    team_id = data.get('team_id')
    player1 = data.get('player1')
    player2 = data.get('player2')

    setup_data = data.get('setup_data') #REMOVE THIS TO MAKE ROOM FOR FOLLOWING DATA TYPES

    opponent1 = data.get('opponent1') #Can be empty ''
    opponent2 = data.get('opponent2') #Can be empty ''
    venue = data.get('venue') #Can be empty ''
    tournament = data.get('tournament') #Can be empty ''
    court_number = data.get('court_number') #Can be empty ''
    fight_number = data.get('fight_number') #Can be empty ''
    conference = data.get('conference') #Can be 0, 1, or 2
    location = data.get('location') #Can be 0, 1, 2, or 3
    match_date = data.get('match_date') #Must be date format, can be 2000-01-01 for undated
    start_time = data.get('start_time') #Must be time format, can be midnight for undated
    strategy = data.get('strategy') #Can be 0, 1, 2, or 3

    team = Team.query.get(team_id)
    if team:
        match = Match(team=team, player1=player1, player2=player2, setup_data=setup_data)
        db.session.add(match)
        db.session.commit()
        return jsonify({'message': 'Match added successfully'}), 200
    else:
        return jsonify({'error': 'Team not found'}), 404

@app.route('/addset', methods=['POST'])
def set_add():
    data = request.json
    match_id = data.get('match_id')
    player1 = data.get('player1')
    player2 = data.get('player2')
    set_data = data.get('set_data')

    match = Match.query.get(match_id)
    if match:
        game_set = MatchSet(match=match, player1=player1, player2=player2, set_data=set_data)
        db.session.add(game_set)
        db.session.commit()
        return jsonify({'message': 'Game set added successfully'}), 200
    else:
        return jsonify({'error': 'Match not found'}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)