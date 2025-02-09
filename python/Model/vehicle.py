from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Vehicle(Base):
    """
    vehicle model class
    """
    __tablename__ = 'vehicle'

    vehicle_id = Column(Integer, primary_key=True)
    type = Column(String)
    capacity = Column(Integer)
    registration_info = Column(String)