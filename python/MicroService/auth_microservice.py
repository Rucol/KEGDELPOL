from flask import Blueprint, jsonify, request, current_app
from Service.auth_service import AuthService
import jwt
from fastapi.encoders import jsonable_encoder

auth_microservice = Blueprint('auth_microservice', __name__)

@auth_microservice.before_app_request
def create_auth_service():
    db = current_app.config['db']
    auth_microservice.auth_service = AuthService(db)

@auth_microservice.route('/login', methods=['POST'])
def login():
    auth_service = auth_microservice.auth_service
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username or password is missing'}), 400

    if auth_service.authenticate_user(username, password):
        token = auth_service.generate_jwt_token(username)
        return jsonify({'token': token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@auth_microservice.route('/register', methods=['POST'])
def register():
    auth_service = auth_microservice.auth_service
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')

    if not username or not password or not role:
        return jsonify({'message': 'Username, password or role is missing'}), 400

    user = auth_service.register_user(username, password, role)
    return jsonify({'message': 'User registered successfully'}), 201

@auth_microservice.route('/modify/<int:user_id>', methods=['PUT'])
def change_role(user_id):
    auth_service = auth_microservice.auth_service
    data = request.get_json()
    new_role = data.get('role')

    if not new_role:
        return jsonify({'message': 'Role is missing'}), 400

    try:
        auth_service.change_user_role(user_id, new_role)
        return jsonify({'message': 'Role updated successfully'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@auth_microservice.route('/check_authorization', methods=['POST'])
def check_authorization():
    auth_service = auth_microservice.auth_service
    token = request.headers.get('Authorization').split()[1]
    data = jwt.decode(token, auth_service.secret_key, algorithms=['HS256'])
    required_role = request.get_json().get('role')

    if data['role'] == required_role:
        return jsonify({'message': 'Authorized'}), 200
    else:
        return jsonify({'message': 'Not authorized'}), 403

@auth_microservice.route('/get_auth_id_and_role', methods=['POST'])
def get_auth_id():
    auth_service = auth_microservice.auth_service
    token = request.headers.get('Authorization').split()[1]
    try:
        auth_id, auth_role = auth_service.get_auth_id_from_token(token)
        return jsonable_encoder({'auth_id': auth_id, 'role': auth_role}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 401
    

@auth_microservice.route('/get_all_users', methods=['GET'])
def get_all_users():
    auth_service = auth_microservice.auth_service
    try:
        users = auth_service.get_all_users()
        return jsonable_encoder(users), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500