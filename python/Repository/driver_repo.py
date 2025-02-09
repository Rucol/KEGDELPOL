from flask_sqlalchemy import SQLAlchemy
from Model.driver import Driver


class DriverRepository:
    def __init__(self, db):
        self.db = db

    def get_all_drivers(self):
        drivers = self.db.session.query(Driver.auth_id, Driver.employee_id, Driver.license_info).all()
        return [dict(driver._asdict()) for driver in drivers]