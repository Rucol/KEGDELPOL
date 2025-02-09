import unittest
from test_server import create_app, push_app_context
from unittest.mock import patch

class ClientMicroserviceTestCase(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.app, cls.db = create_app()
        cls.app_context = push_app_context(cls.app)
        cls.client = cls.app.test_client()

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

    @patch('Service.client_service.ClientService.add_user')
    def test_add_user(self, mock_add_user):
        response = self.client.post('/client/users', json={
            'customer_id': 1,
            'name': 'John Doe',
            'address': '123 Main St',
            'phone_number': '555-1234',
            'auth_id': 2
        })
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.get_json(), {'message': 'User added successfully'})
        mock_add_user.assert_called_once()

    @patch('Service.client_service.ClientService.add_user')
    def test_add_user_missing_field(self, mock_add_user):
        response = self.client.post('/client/users', json={
            'name': 'John Doe',
            'address': '123 Main St',
            'phone_number': '555-1234',
            'auth_id': 2
        })
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.get_json(), {'error': 'Missing required field: customer_id'})
        mock_add_user.assert_not_called()

    @patch('Service.client_service.ClientService.modify_user')
    def test_modify_user(self, mock_modify_user):
        response = self.client.put('/client/users/1', json={
            'name': 'Jane Doe',
            'address': '456 Main St',
            'phone_number': '555-5678',
            'auth_id': 2
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {'message': 'User modified successfully'})
        mock_modify_user.assert_called_once_with('1', {
            'name': 'Jane Doe',
            'address': '456 Main St',
            'phone_number': '555-5678',
            'auth_id': 2
        })

    @patch('Service.client_service.ClientService.modify_user')
    def test_modify_user_missing_data(self, mock_modify_user):
        response = self.client.put('/client/users/1', json={})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.get_json(), {'error': 'Invalid or missing JSON data'})
        mock_modify_user.assert_not_called()

    @patch('Service.client_service.ClientService.delete_user')
    def test_delete_user(self, mock_delete_user):
        response = self.client.delete('/client/users/1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {'message': 'User deleted successfully'})
        mock_delete_user.assert_called_once_with('1')

if __name__ == '__main__':
    unittest.main()
