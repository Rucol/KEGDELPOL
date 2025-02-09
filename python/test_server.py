from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from MicroService import auth_microservice, client_microservice, driver_microservice, employee_microservice, notification_microservice, order_microservice
from Model.database import init_db

user = "tester"
password = "micro4321"

def create_app():
    app = Flask(__name__)
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+mysqldb://{user}:{password}@localhost:3306/test'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db = SQLAlchemy(app)
    app.config['db'] = db

    with app.app_context():
        # Initialize the database tables
        db.create_all()

        # Initialize the session and register blueprints
        session = init_db(app)
        
        app.register_blueprint(auth_microservice.auth_microservice, url_prefix='/auth')
        app.register_blueprint(client_microservice.client_microservice, url_prefix='/client')
        app.register_blueprint(driver_microservice.driver_microservice, url_prefix='/driver')
        app.register_blueprint(employee_microservice.employee_microservice, url_prefix='/employee')
        app.register_blueprint(notification_microservice.notification_microservice, url_prefix='/notification')
        app.register_blueprint(order_microservice.order_microservice, url_prefix='/order')

    return app, db

def push_app_context(app):
    ctx = app.app_context()
    ctx.push()
    return ctx