from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Role(Base):
    """
    role model class
    """
    __tablename__ = 'role'

    role_id = Column(Integer, primary_key=True)
    role_description = Column(String)
    role_access = Column(String)
    role_name = Column(String)