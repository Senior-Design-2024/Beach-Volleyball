from flask import Flask, jsonify

app = Flask(__name__)

#for testing if Flask is online
@app.route('/', methods=['GET'])
def status_200():
  return jsonify({'messages': ['Hi Bear!', 'Hi Katelyn!']}), 200

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5000)