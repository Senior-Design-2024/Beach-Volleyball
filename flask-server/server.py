from flask import Flask, jsonify, request
#from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import select, column, inspect
import sys
import pymysql
import dbcreds
import random

# Define SQLAlchemy database connection URI
conn = "mysql+pymysql://{0}:{1}@{2}/{3}".format(dbcreds.dbuser, dbcreds.dbpass, dbcreds.dbhost, dbcreds.dbname)

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'key'
app.config['SQLALCHEMY_DATABASE_URI'] = conn
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable tracking modifications for better performance
db = SQLAlchemy(app)

# Define SQLAlchemy models

class User(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

class Team(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    user = db.relationship('User', backref=db.backref('team', lazy=True))

class Player(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    team_id = db.Column(db.BigInteger, db.ForeignKey('team.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    team = db.relationship('Team', backref=db.backref('player', lazy=True))

class Match(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    team_id = db.Column(db.BigInteger, db.ForeignKey('team.id'), nullable=False)
    player1 = db.Column(db.BigInteger, db.ForeignKey('player.id'), nullable=False)
    player2 = db.Column(db.BigInteger, db.ForeignKey('player.id'), nullable=False)
    opponent1_name = db.Column(db.String(100))
    opponent2_name = db.Column(db.String(100))
    opponent1_number = db.Column(db.Integer)
    opponent2_number = db.Column(db.Integer)
    venue = db.Column(db.String(100))
    tournament = db.Column(db.String(100))
    court_number = db.Column(db.String(100))
    flight_number = db.Column(db.String(100))
    conference = db.Column(db.Integer)
    location = db.Column(db.Integer)
    match_date = db.Column(db.Date)
    sched_start_time = db.Column(db.Time)
    strategy = db.Column(db.Integer)
    team = db.relationship('Team', backref=db.backref('match', lazy=True))
    player1_rel = db.relationship('Player', foreign_keys=[player1], backref=db.backref('matches1', lazy=True))
    player2_rel = db.relationship('Player', foreign_keys=[player2], backref=db.backref('matches2', lazy=True))

class MatchSet(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    match_id = db.Column(db.BigInteger, db.ForeignKey('match.id'), nullable=False)
    match_set_data = db.Column(db.JSON, nullable=False)
    match = db.relationship('Match', backref=db.backref('set', lazy=True))

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
def add_player():
    data = request.json
    player_name = data.get('player_name')
    team_id = data.get('team_id')  # Assuming you get team_id from the request data
    description = data.get('description')

    team = db.session.get(Team, team_id)
    if team:
        player = Player(name=player_name, team_id=team_id, description=description)
        db.session.add(player)
        db.session.commit()
        return jsonify({'message': 'Player added successfully'}), 200
    else:
        return jsonify({'error': 'Team not found'}), 404


@app.route('/addmatch', methods=['POST'])
def match_add():
    data = request.json
    team_id = data.get('team_id')
    player1_id = data.get('player1')
    player2_id = data.get('player2')
    opponent1_name = data.get('opponent1_name') #Can be empty ''
    opponent2_name = data.get('opponent2_name') #Can be empty ''
    opponent1_number = data.get('opponent1_number') #Can be empty ''
    opponent2_number = data.get('opponent2_number') #Can be empty ''
    venue = data.get('venue') #Can be empty ''
    tournament = data.get('tournament') #Can be empty ''
    court_number = data.get('court_number') #Can be empty ''
    flight_number = data.get('flight_number') #Can be empty ''
    conference = data.get('conference') #Can be 0, 1, or 2
    location = data.get('location') #Can be 0, 1, 2, or 3
    match_date = data.get('match_date') #Must be date format, can be NULL for undated
    sched_start_time = data.get('sched_start_time') #Must be time format, can be NULL for no time
    strategy = data.get('strategy') #Can be 0, 1, 2, or 3

    if match_date == '':
        match_date = None
    
    if sched_start_time == '':
        sched_start_time = None

    team = db.session.get(Team, team_id)
    player1 = db.session.get(Player, player1_id)
    player2 = db.session.get(Player, player2_id)
    if team:
    
        match = Match(team=team,
                      player1=player1_id,
                      player2=player2_id,
                      opponent1_name=opponent1_name,
                      opponent2_name=opponent2_name,
                      opponent1_number=opponent1_number,
                      opponent2_number=opponent2_number,
                      venue=venue,
                      tournament=tournament,
                      court_number=court_number,
                      flight_number=flight_number,
                      conference=conference,
                      location=location,
                      match_date=match_date,
                      sched_start_time=sched_start_time,
                      strategy=strategy)
        

        db.session.add(match)
        db.session.commit()
        
        return jsonify({'message': 'Match added successfully'}), 200
    else:
        return jsonify({'error': 'Team and/or Player not found'}), 404

@app.route('/addset', methods=['POST'])
def set_add():
    data = request.json
    match_id = data.get('match_id')
    match_set_data = data.get('match_set_data')

    match = db.session.get(Match, match_id)
    if match:
        match_set = MatchSet(match=match, match_set_data=match_set_data)
        db.session.add(match_set)
        db.session.commit()
        return jsonify({'message': 'Match set added successfully'}), 200
    else:
        return jsonify({'error': 'Match not found'}), 404
    
@app.route('/matchquery', methods=['GET'])
def match_data():

    def generate_random_numbers():
        random_numbers = [round(random.uniform(1, 3), 2) for _ in range(20)]
        return random_numbers

    output = {
        'action' : [
        "attack swing",
        "attack roll",
        "attack poke",
        "attack bump",
        "attack set",
        "option swing",
        "option roll",
        "option poke",
        "option bump",
        "option set",
        "dig swing",
        "dig roll",
        "dig poke",
        "dig bump",
        "dig set",
        "set platform",
        "set error",
        "block overpass",
        "block term",
        "block control"],

        'player_1_average' : generate_random_numbers(),
        'player_2_average' : generate_random_numbers()
    }

    return jsonify(output)

@app.route('/find', methods=['GET'])
def find_db():

    def to_dict(instance):
        """
        Convert the SQLAlchemy object to a dictionary.
        """
        return {c.name: getattr(instance, c.name) for c in instance.__table__.columns}

    data = request.json

    table_name = data.get('table')

    # Create filter data
    filters = {}

    # Fill filters with potential filter criteria from JSON
    for key, value in data.items():
        if key != 'table':
            filters[key] = value


    match table_name:
        case "user":
            query = db.session.query(User)
        
        case "team":
            query = db.session.query(Team)
        
        case "player":
            query = db.session.query(Player)
        
        case "match":
            query = db.session.query(Match)

        case "match_set":
            query = db.session.query(MatchSet)
    
    # Apply filters to the query
    for key, value in filters.items():
        column = getattr(query.column_descriptions[0]['type'], key, None)
        if column:
            query = query.filter(column == value)

    # Execute the query and get the results
    results = query.all()

    output = [to_dict(result) for result in results]

    return jsonify(output), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)