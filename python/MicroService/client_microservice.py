from flask import Blueprint, jsonify, request, current_app
from Service.client_service import ClientService

client_microservice = Blueprint('client_microservice', __name__)

@client_microservice.before_app_request
def create_client_service():
    db = current_app.config['db']
    client_microservice.client_service = ClientService(db)

# Add user
@client_microservice.route('/users', methods=['POST'])
def add_user():
    client_service = client_microservice.client_service
    data = request.get_json()

    if not data:
        return jsonify({'error': 'Invalid or missing JSON data'}), 400

    required_fields = ['customer_id', 'name', 'address', 'phone_number', 'auth_id']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400

    client_service.add_user(data)
    return jsonify({'message': 'User added successfully'}), 201

# Modify user
@client_microservice.route('/users/<user_id>', methods=['PUT'])
def modify_user(user_id):
    client_service = client_microservice.client_service
    data = request.get_json()

    if not data:
        return jsonify({'error': 'Invalid or missing JSON data'}), 400

    client_service.modify_user(user_id, data)
    return jsonify({'message': 'User modified successfully'}), 200

# Delete user
@client_microservice.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    client_service = client_microservice.client_service
    client_service.delete_user(user_id)
    return jsonify({'message': 'User deleted successfully'}), 200

