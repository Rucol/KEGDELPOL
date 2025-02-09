from Model.order_detail import OrderDetail

class OrderDetailRepository:
    def __init__(self, db):
        self.db = db

    def update_order_detail(self, order_detail):
        self.db.session.commit()

    def get_order_details(self, order_id):
        orders = self.db.session.query(OrderDetail.order_id, OrderDetail.order_detail_id, OrderDetail.product_id, OrderDetail.quantity, OrderDetail.total_price).filter(OrderDetail.order_id == order_id).all()
        return [dict(order._asdict()) for order in orders]
