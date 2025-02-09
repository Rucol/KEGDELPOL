from flask_sqlalchemy import SQLAlchemy


class EmployeeRepository:
    def __init__(self, db):
        self.db = db
