from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Authorization(Base):
    """
    Authorization model class
    """
    __tablename__ = 'authorization'

    auth_id = Column(Integer, primary_key=True)
    login = Column(String)
    password = Column(String)
    role = Column(String)
    

