from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Status(Base):
    """
    status model class
    """
    __tablename__ = 'status'

    status_id = Column(Integer, primary_key=True)
    status_name = Column(String)
    description = Column(String)