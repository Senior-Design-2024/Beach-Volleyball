from flask import Flask, jsonify

app = Flask(__name__)

#for testing if Flask is online
@app.route('/', methods=['GET'])
def status_200():
  return jsonify({'message': 'Hi Bear!'}), 200

@app.route('/login', methods=['GET'])
def status_200():
  return 200

if __name__ == '__main__':
  app.run(debug=True)