from flask import Flask
from flask_sqlalchemy import SQLAlchemy
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

class Pair(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    team_id = db.Column(db.BigInteger, db.ForeignKey('team.id'), nullable=False)
    player1_id = db.Column(db.BigInteger, db.ForeignKey('player.id'), nullable=False)
    player2_id = db.Column(db.BigInteger, db.ForeignKey('player.id'), nullable=False)
    team = db.relationship('Team', backref=db.backref('pairs', lazy=True))
    player1 = db.relationship('Player', foreign_keys=[player1_id], backref=db.backref('pairs1', lazy=True))
    player2 = db.relationship('Player', foreign_keys=[player2_id], backref=db.backref('pairs2', lazy=True))

class Match(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    team_id = db.Column(db.BigInteger, db.ForeignKey('team.id'), nullable=False)
    player1_id = db.Column(db.BigInteger, db.ForeignKey('player.id'), nullable=False)
    player2_id = db.Column(db.BigInteger, db.ForeignKey('player.id'), nullable=False)
    pair_id = db.Column(db.BigInteger, db.ForeignKey('pair.id'), nullable=False)
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
    match_date = db.Column(db.String(100))
    sched_start_time = db.Column(db.String(100))
    strategy = db.Column(db.Integer)
    team = db.relationship('Team', backref=db.backref('match', lazy=True))
    player1 = db.relationship('Player', foreign_keys=[player1_id], backref=db.backref('matches1', lazy=True))
    player2 = db.relationship('Player', foreign_keys=[player2_id], backref=db.backref('matches2', lazy=True))
    pair = db.relationship('Pair', foreign_keys=[pair_id], backref=db.backref('match3', lazy=True))

class MatchSet(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    match_id = db.Column(db.BigInteger, db.ForeignKey('match.id'), nullable=False)
    set_num = db.Column(db.SmallInteger, nullable=False)
    win_state = db.Column(db.Boolean, nullable=True)
    match = db.relationship('Match', backref=db.backref('sets', lazy=True))

class Point(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    match_set_id = db.Column(db.BigInteger, db.ForeignKey('match_set.id'), nullable=False)
    win = db.Column(db.Boolean, nullable=False)
    match_set = db.relationship('MatchSet', backref=db.backref('points', lazy=True))

class Event(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    point_id = db.Column(db.BigInteger, db.ForeignKey('point.id'), nullable=False)
    data = db.Column(db.Integer, nullable=False)
    e_index = db.Column(db.SmallInteger, nullable=False)
    point = db.relationship('Point', backref=db.backref('events', lazy=True))


import find_path
import add_path
import del_path
import mod_path

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)