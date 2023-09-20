from flask import Flask

app = Flask(__name__)

@app.route('/api/endpoint1', methods=['GET'])
def endpoint1():
  pass

@app.route('/api/endpoint2', methods=['GET'])
def endpoint2():
  pass

if __name__ == '__main__':
  app.run(debug=True)