import flask

app = flask.Flask(__name__)

@app.route('/', methods = ['GET'])
def home() -> str:
  return '<h1> Fuckerssss </h1>'

if __name__ == '__main__':
  app.run(debug = True)
