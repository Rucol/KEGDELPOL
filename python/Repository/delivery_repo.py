from flask_sqlalchemy import SQLAlchemy


class DeliveryRepository:
    def __init__(self, db):
        self.db = db
