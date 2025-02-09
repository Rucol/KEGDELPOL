import unittest
from flask_sqlalchemy import SQLAlchemy
from test_server import create_app, push_app_context
from Service.auth_service import AuthService

class AuthMicroserviceTestCase(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.app, cls.db = create_app()
        cls.app_context = push_app_context(cls.app)
        cls.client = cls.app.test_client()
        cls.auth_service = AuthService(cls.db)

    @classmethod
    def tearDownClass(cls):
        cls.app_context.pop()

    def setUp(self):
        with self.app.app_context():
            self.db.create_all()

    def tearDown(self):
        with self.app.app_context():
            self.db.session.remove()
            self.db.drop_all()

    def test_register_user(self):
        response = self.client.post('/auth/register', json={
            'username': 'testuser',
            'password': 'password123',
            'role': 'user'
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.get_json(), {'message': 'User registered successfully'})

    def test_login_user(self):
        with self.app.app_context():
            self.auth_service.register_user('testuser', 'password123', 'user')
        response = self.client.post('/auth/login', json={
            'username': 'testuser',
            'password': 'password123'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('token', response.get_json())

    def test_login_user_invalid_credentials(self):
        response = self.client.post('/auth/login', json={
            'username': 'wronguser',
            'password': 'wrongpassword'
        })
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.get_json(), {'message': 'Invalid credentials'})

    def test_check_authorization(self):
        with self.app.app_context():
            self.auth_service.register_user('testuser', 'password123', 'user')
            token = self.auth_service.generate_jwt_token('testuser')

        response = self.client.post('/auth/check_authorization', json={'role': 'user'},
                                    headers={'Authorization': f'Bearer {token}'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {'message': 'Authorized'})

    def test_check_authorization_invalid_role(self):
        with self.app.app_context():
            self.auth_service.register_user('testuser', 'password123', 'user')
            token = self.auth_service.generate_jwt_token('testuser')

        response = self.client.post('/auth/check_authorization', json={'role': 'admin'},
                                    headers={'Authorization': f'Bearer {token}'})
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.get_json(), {'message': 'Not authorized'})
