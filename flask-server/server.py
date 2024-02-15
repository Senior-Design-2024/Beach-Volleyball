from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import pymysql
import dbcreds

conn = "mysql+pymysql://{0}:{1}@{2}/{3}".format(dbcreds.dbuser, dbcreds.dbpass, dbcreds.dbhost, dbcreds.dbname)

app = Flask(__name__)
app.config['SECRET_KEY']='key'
app.config['SQLALCHEMY_DATABASE_URI'] = conn
db = SQLAlchemy(app)

CORS(app)

#for testing if Flask is online
@app.route('/test')
def test():
  return {'message': 'working'}

#USE: json containing username and email sent, confirmation sent back
@app.route('/adduser', methods=['POST'])
def useradd():
  data = request.json

  #test

  return {'username':data.get('username'), 'email':data.get('email'), 'userid':''}, 200

<<<<<<< HEAD
=======
#USE: json containing email of user, as well as a team name, confirmation sent back
@app.route('/addteam', methods=['POST'])
def teamadd():
  data = request.json

  user_id = 'null'
  team_name = 'null'

  #search function for user with email, use this to get the user's id value
  #create team for user, using the userid for user_id and teamname for team name

  return {'user_id':user_id, 'team_name':team_name}, 200

#USE: json containing email of user, team name, and player name is sent, confirmation sent back
@app.route('/addplayer', methods=['POST'])
def playeradd():
  data = request.json

  team_id = 'null'
  player_name = 'null'

  #search function for user with email, use this to get the user's id value
  #using the team name and user_id, find proper team to get team_id

  #create player and link them to the team using team_id

  return {'team_id':team_id, 'player_name':player_name}, 200

#USE: json containing two player ids, user email, as well as all setup data, is sent, confirmation returned
@app.route('/addgame', methods=['POST'])
def gameadd():
  data = request.json

  game_id = 'null'
  user_id = 'null'
  team_id = 'null'
  setup_data = 'null'
  game_name = 'null'


  #search function for user with email, use this to get the user's id value
  #using the team name and user_id, find proper team to get team_id

  return {'user_id':user_id, 'game_name':game_name}, 200

@app.route('/addset', methods=['POST'])
def setadd():
  data = request.json

  game_id = 'null'
  set_id = 'null'

  return{'game_id':game_id, 'set_id':set_id}, 200

>>>>>>> origin/database
app.debug = True
app.run(host="0.0.0.0", port=5000)