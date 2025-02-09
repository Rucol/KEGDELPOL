from Model.product import Product

class ProductRepository:
    def __init__(self, db):
        self.db = db
    
    
    def get_all_products(self):
        products = self.db.session.query(Product.product_id, Product.name, Product.description, Product.price).all()
        return [dict(product._asdict()) for product in products]
    
    def add_product(self, new_product):
        self.db.session.add(new_product)
        self.db.session.commit()        
    