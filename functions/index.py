from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class hello_world(Resource):
  def get(self):
    return { 'hello': 'world' }

api.add_resource(hello_world, '/')

if __name__ == '__main__':
  app.run(debug=True)
