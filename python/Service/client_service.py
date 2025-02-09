from Repository import customer_repo, order_repo, product_repo, order_detail_repo
from Model.customer import Customer

class ClientService:
    def __init__(self, db):
        self.customer_repo = customer_repo.CustomerRepository(db)
        self.order_repo = order_repo.OrderRepository(db)
        self.product_repo = product_repo.ProductRepository(db)
        self.order_detail_repo = order_detail_repo.OrderDetailRepository(db)

    def add_user(self, user_data):
        new_user = Customer(**user_data)
        self.customer_repo.add_user(new_user)

    def modify_user(self, user_id, user_data):
        self.customer_repo.modify_user(user_id, user_data)

    def delete_user(self, user_id):
        self.customer_repo.delete_user(user_id)
