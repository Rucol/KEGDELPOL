from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Employee(Base):
    """
    Employee model class
    """
    __tablename__ = 'employee'

    employee_id = Column(Integer, primary_key=True)
    employee_name = Column(String)
    employee_surname = Column(String)
    phone_number = Column(String)
    auth_id = Column(Integer, ForeignKey('authorization.auth_id'))