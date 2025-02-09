from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Customer(Base):
    """
    Customer model class
    """
    __tablename__ = 'customer'

    customer_id = Column(Integer, primary_key=True)
    name = Column(String)
    address = Column(String)
    phone_number = Column(String(15))
    auth_id = Column(Integer, ForeignKey('authorization.auth_id'))