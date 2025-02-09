from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Delivery(Base):
    """
    Delivery model class
    """
    __tablename__ = 'delivery'

    delivery_id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey('order.order_id'))
    route_id = Column(Integer, ForeignKey('route.route_id'))
    driver_id = Column(Integer, ForeignKey('driver.employee_id'))
    vehicle_id = Column(Integer, ForeignKey('vehicle.vehicle_id'))
    actual_delivery_date = Column(DateTime)
    notes = Column(Text)