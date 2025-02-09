from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.types import DECIMAL as Decimal
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class OrderDetail(Base):
    """
    order detail model class
    """
    __tablename__ = 'order_detail'

    order_detail_id = Column(Integer, primary_key=True)
    order_id = Column(Integer)
    product_id = Column(Integer)
    quantity = Column(Integer)
    total_price = Column(Decimal)