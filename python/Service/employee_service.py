from Repository import customer_repo, vehicle_repo, order_repo, product_repo
from Model.vehicle import Vehicle
from Model.product import Product

class EmployeeService:
    def __init__(self, db):
        self.customer_repo = customer_repo.CustomerRepository(db)
        self.vehicle_repo = vehicle_repo.VehicleRepository(db)
        self.order_repo = order_repo.OrderRepository(db)
        self.product_repo = product_repo.ProductRepository(db)

    def add_vehicle(self, vehicle_data):
        self.vehicle_repo.add_vehicle(vehicle_data)
        
    def get_all_vehicles(self):
        return self.vehicle_repo.get_all_vehicles()


    def get_order_details(self, order_id):
        return self.order_repo.get_order_details(order_id)
    
    def get_products(self):
        return self.product_repo.get_all_products()
    
    def add_product(self, product_data):
        self.product_repo.add_product(product_data)
