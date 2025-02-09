from flask_sqlalchemy import SQLAlchemy


class RoleRepository:
    def __init__(self, db):
        self.db = db
