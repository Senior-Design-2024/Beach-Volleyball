from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import pymysql
import secrets

conn = "mysql+pymysql://{0}:{1}@{2}/{3}".format(secrets.dbuser, secrets.dbpass, secrets.dbhost, secrets.dbname)

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
@app.route('/adduser', methods=['GET', 'POST'])
def useradd():
  data = request.json
  return {'username':data.get('username'), 'email':data.get('email'), 'userid':''}, 200

app.run(host="0.0.0.0", port=5000)