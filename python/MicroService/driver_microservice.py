from flask import Blueprint, jsonify, request, current_app
from Service.driver_service import DriverService
import jwt
from fastapi.encoders import jsonable_encoder

driver_microservice = Blueprint('driver_microservice', __name__)

def decode_jwt_token(token):
    try:
        decoded = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
        return decoded
    except jwt.ExpiredSignatureError:
        raise Exception("Token expired")
    except jwt.InvalidTokenError:
        raise Exception("Invalid token")

@driver_microservice.before_app_request
def create_driver_service():
    db = current_app.config['db']
    driver_microservice.driver_service = DriverService(db)

@driver_microservice.route('/orders', methods=['GET'])
def get_orders():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Missing Authorization header'}), 401

    token = auth_header.split(" ")[1]
    try:
        username = decode_jwt_token(token)['username']
    except Exception as e:
        return jsonify({'message': 'Invalid token'}), 401

    driver_service = driver_microservice.driver_service
    orders = driver_service.get_orders_for_driver(username)
    return jsonable_encoder({'orders': orders}), 200

@driver_microservice.route('/orders/<int:order_id>', methods=['PUT'])
def update_order_status(order_id):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'message': 'Missing Authorization header'}), 401

    token = auth_header.split(" ")[1]
    try:
        username = decode_jwt_token(token)['username']
    except Exception as e:
        return jsonify({'message': 'Invalid token'}), 401

    data = request.get_json()
    new_status = data.get('status')
    if not new_status:
        return jsonify({'message': 'Missing status in request body'}), 400

    driver_service = driver_microservice.driver_service
    success = driver_service.update_order_status(order_id, username, new_status)
    if success:
        return jsonify({'message': 'Order status updated successfully'}), 200
    else:
        return jsonify({'message': 'Failed to update order status'}), 400


@driver_microservice.route('/get_all_drivers', methods=['GET'])
def get_all_drivers():
    driver_service = driver_microservice.driver_service
    try:
        drivers = driver_service.get_products()
        return jsonable_encoder(drivers), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500