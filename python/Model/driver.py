from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Driver(Base):
    """
    Driver model class
    """
    __tablename__ = 'driver'

    employee_id = Column(Integer, primary_key=True)
    license_info = Column(String)
    auth_id = Column(Integer, ForeignKey('authorization.auth_id'))