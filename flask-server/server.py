from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#for testing if Flask is online
@app.route('/', methods=['GET'])
def status_200():
  return jsonify({'messages': ['Hi Bear!', 'Hi Katelyn!']}), 200

@app.route('/test')
def test():
  return {'message': 'working'}

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5000)