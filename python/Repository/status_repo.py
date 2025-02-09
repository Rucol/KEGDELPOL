from flask_sqlalchemy import SQLAlchemy


class StatusRepository:
    def __init__(self, db):
        self.db = db
