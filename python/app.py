from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from MicroService import auth_microservice, client_microservice, driver_microservice, employee_microservice, notification_microservice, order_microservice
from Model.database import init_db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqldb://IgorGawlowicz:micro4321@IgorGawlowicz.mysql.pythonanywhere-services.com/IgorGawlowicz$kegdelpol'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_POOL_RECYCLE'] = 299
app.config['SQLALCHEMY_POOL_TIMEOUT'] = 20
app.config['SECRET_KEY'] = 'secret'

db = SQLAlchemy(app)
app.config['db'] = db

with app.app_context():
    init_db(app)

app.register_blueprint(auth_microservice.auth_microservice, url_prefix='/kegdelpol/auth')
app.register_blueprint(client_microservice.client_microservice, url_prefix='/kegdelpol/client')
app.register_blueprint(driver_microservice.driver_microservice, url_prefix='/kegdelpol/driver')
app.register_blueprint(employee_microservice.employee_microservice, url_prefix='/kegdelpol/employee')
app.register_blueprint(notification_microservice.notification_microservice, url_prefix='/kegdelpol/notification')
app.register_blueprint(order_microservice.order_microservice, url_prefix='/kegdelpol/order')

if __name__ == '__main__':
    app.run()
