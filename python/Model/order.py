from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.types import DECIMAL as Decimal
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Order(Base):
    """
    Order model class
    """
    __tablename__ = 'order'

    order_id = Column(Integer, primary_key=True)
    customer_id = Column(Integer)
    order_date = Column(DateTime)
    delivery_date = Column(DateTime)
    status = Column(String)
    weight = Column(Decimal)