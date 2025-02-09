from flask import Blueprint, jsonify, request, current_app
from Service.employee_service import EmployeeService
from Model.vehicle import Vehicle
from Model.product import Product
from fastapi.encoders import jsonable_encoder

employee_microservice = Blueprint('employee_microservice', __name__)

@employee_microservice.before_app_request
def create_employee_service():
    db = current_app.config['db']
    employee_microservice.employee_service = EmployeeService(db)

# Add vehicle
@employee_microservice.route('/vehicles', methods=['POST'])
def add_vehicle():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid or missing JSON data'}), 400

    required_fields = ['type', 'capacity', 'registration_info']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400

    new_vehicle = Vehicle(
        type=data['type'],
        capacity=data['capacity'],
        registration_info=data['registration_info']
    )

    employee_service = employee_microservice.employee_service
    employee_service.add_vehicle(new_vehicle)

    return jsonify({'message': 'Vehicle added successfully'}), 201


@employee_microservice.route('/get_all_vehicles', methods=['GET'])
def get_all_vehicles():
    employee_service = employee_microservice.employee_service
    try:
        vehicles = employee_service.get_all_vehicles()
        return jsonable_encoder(vehicles), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    
    
@employee_microservice.route('/get_all_products', methods=['GET'])
def get_all_products():
    employee_service = employee_microservice.employee_service
    try:
        products = employee_service.get_products()
        return jsonable_encoder(products), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    
    
@employee_microservice.route('/product', methods=['POST'])
def add_product():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid or missing JSON data'}), 400

    required_fields = ['name', 'description', 'price']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400

    new_product = Product(
        name=data['name'],
        description=data['description'],
        price=data['price']
    )

    employee_service = employee_microservice.employee_service
    employee_service.add_product(new_product)

    return jsonify({'message': 'Vehicle added successfully'}), 201