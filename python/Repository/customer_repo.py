from Model.order import Order
from Model.customer import Customer

class CustomerRepository:
    def __init__(self, db):
        self.db = db

    def get_orders_by_client_id(self, client_id):
        orders = self.db.session.query(Order.customer_id, Order.delivery_date, Order.order_date, Order.order_id, Order.status, Order.weight).filter(Order.customer_id == client_id).all()
        return [dict(order._asdict()) for order in orders]

    def add_user(self, new_user):
        self.db.session.add(new_user)
        self.db.session.commit()

    def modify_user(self, user_id, user_data):
        user = self.db.session.query(Customer).filter(Customer.customer_id == user_id).first()
        for key in user_data:
            setattr(user, key, user_data[key])
        self.db.session.commit()

    def delete_user(self, user_id):
        user = self.db.session.query(Customer).filter(Customer.customer_id == user_id).first()
        self.db.session.delete(user)
        self.db.session.commit()
