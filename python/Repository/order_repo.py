from Model.order import Order
from Model.order_detail import OrderDetail
from sqlalchemy.orm import scoped_session, sessionmaker

class OrderRepository:
    def __init__(self, db):
        self.db = db
        self.Session = scoped_session(sessionmaker(bind=db.engine))

    def get_orders_for_driver(self, driver_username):
        
        orders = self.db.session.query(Order.customer_id, Order.delivery_date, Order.order_date, Order.order_id, Order.status, Order.weight).filter(Order.driver_id == driver_username).all()
        return [dict(order._asdict()) for order in orders]  

    def add_order(self, new_order):
        self.db.session.add(new_order)
        self.db.session.commit()
            
    def add_detail(self, new_order_detail):
        self.db.session.add(new_order_detail)
        self.db.session.commit()

    def delete_order(self, order_id):
        order = self.db.session.query(Order).filter(Order.order_id == order_id).first()
        self.db.session.delete(order)
        self.db.session.commit()

    def modify_order(self, order_id, order_data):
        order = self.db.session.query(Order).filter(Order.order_id == order_id).first()
        for key in order_data:
            setattr(order, key, order_data[key])
        self.db.session.commit()

    def get_all_orders(self):
        orders = self.db.session.query(Order.customer_id, Order.delivery_date, Order.order_date, Order.order_id, Order.status, Order.weight).all()
        return [dict(order._asdict()) for order in orders]
    
    def get_order(self):
        return self.db.session.query(Order.order_id).order_by(Order.order_id.desc()).first()[0]
    
    def get_order_by_id(self, order_id):
        order = self.db.session.query(Order).filter(Order.order_id == order_id).first()
        return order
    
    def update_order(self, order):
        with self.Session() as session:
            existing_order = session.query(Order).filter_by(order_id=order.order_id).first()
            if not existing_order:
                raise ValueError("Order not found")
            
            existing_order.status = order.status
            existing_order.customer_id = order.customer_id
            existing_order.order_date = order.order_date
            existing_order.delivery_date = order.delivery_date
            existing_order.weight = order.weight
            
            session.commit()
    
    def update_order_status(self, order_id, driver_username, new_status):
        order = self.db.session.query(Order).filter_by(order_id=order_id, driver_id=driver_username).first()
        if order:
            order.status = new_status
            self.db.session.commit()
            return True
        return False

    def get_orders_by_client_id(self, client_id):
        orders = self.db.session.query(Order.customer_id, Order.delivery_date, Order.order_date, Order.order_id, Order.status, Order.weight).filter(Order.client_id == client_id).all()
        return [dict(order._asdict()) for order in orders]

    def get_order_details(self, order_id):
        return self.db.session.query(OrderDetail).filter(OrderDetail.order_detail_id == order_id).first()
