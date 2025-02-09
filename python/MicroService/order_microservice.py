from flask import Blueprint, jsonify, request, current_app
from Model.order import Order
from Model.order_detail import OrderDetail
from Service.order_service import OrderService
from fastapi.encoders import jsonable_encoder

order_microservice = Blueprint('order_microservice', __name__)

@order_microservice.before_app_request
def create_order_service():
    db = current_app.config['db']
    order_microservice.order_service = OrderService(db)

# Add order
@order_microservice.route('/orders', methods=['POST'])
def add_order():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid or missing JSON data'}), 400

    new_order = Order(
        customer_id=data['customer_id'],
    )
    
    

    order_service = order_microservice.order_service
    order_service.add_order(new_order)
    
    order_id = get_order()
    
    new_detail = OrderDetail(
        order_id = order_id[0],
        product_id = data['product_id'],
        quantity = data["quantity"],
        total_price = data["total_price"]
    )
    
    order_service.add_order_detail(new_detail)

    return jsonify({"message": "Order added successfully"}), 201

# Get orders by client ID
@order_microservice.route('/client/<int:client_id>', methods=['GET'])
def get_orders_by_client_id(client_id):
    order_service = order_microservice.order_service
    orders = order_service.get_orders_by_client_id(client_id)
    return jsonable_encoder(orders), 200

# Delete order
@order_microservice.route('/orders/<order_id>', methods=['DELETE'])
def delete_order(order_id):
    order_service = order_microservice.order_service
    order_service.delete_order(order_id)
    return jsonify({"message": "Order deleted successfully"}), 200

# Update order
@order_microservice.route('/orders/<order_id>', methods=['PUT'])
def update_order(order_id):
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid or missing JSON data'}), 400

    order_service = order_microservice.order_service
    order_service.update_order(order_id, data)

    return jsonify({"message": "Order updated successfully"}), 200

# Get order details
@order_microservice.route('/orders/details/<order_id>', methods=['GET'])
def order_details(order_id):
    order_service = order_microservice.order_service
    order = order_service.get_order_details(order_id)
    return jsonable_encoder(order), 200

@order_microservice.route('/orders/<order_id>', methods=['GET'])
def get_order():
    order_service = order_microservice.order_service
    order = order_service.get_order()
    return jsonable_encoder(order), 200

# Modify order
@order_microservice.route('/orders/<order_id>', methods=['PUT'])
def modify_order(order_id):
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid or missing JSON data'}), 400

    order_service = order_microservice.order_service
    order_service.modify_order(order_id, data)

    return jsonify({'message': 'Order modified successfully'}), 200

# Get all orders
@order_microservice.route('/orders', methods=['GET'])
def get_all_orders():
    order_service = order_microservice.order_service
    orders = order_service.get_all_orders()
    return jsonable_encoder(orders), 200
