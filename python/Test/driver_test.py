import unittest
from test_server import create_app, push_app_context
from unittest.mock import patch
import jwt
from flask import current_app

class DriverMicroserviceTestCase(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.app, cls.db = create_app()
        cls.app_context = push_app_context(cls.app)
        cls.client = cls.app.test_client()
        with current_app.app_context():
            current_app.config['SECRET_KEY'] = 'secret'

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

    def generate_token(self, username):
        with self.app.app_context():
            payload = {'username': username}
            token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
            return token

    @patch('Service.driver_service.DriverService.get_orders_for_driver')
    def test_get_orders(self, mock_get_orders_for_driver):
        mock_get_orders_for_driver.return_value = [{'order_id': 1, 'status': 'pending'}]
        token = self.generate_token('testdriver')
        response = self.client.get('/driver/orders', headers={'Authorization': f'Bearer {token}'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {'orders': [{'order_id': 1, 'status': 'pending'}]})
        mock_get_orders_for_driver.assert_called_once_with('testdriver')

    def test_get_orders_missing_auth_header(self):
        response = self.client.get('/driver/orders')
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.get_json(), {'message': 'Missing Authorization header'})

    def test_get_orders_invalid_token(self):
        response = self.client.get('/driver/orders', headers={'Authorization': 'Bearer invalidtoken'})
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.get_json(), {'message': 'Invalid token'})

    @patch('Service.driver_service.DriverService.update_order_status')
    def test_update_order_status(self, mock_update_order_status):
        mock_update_order_status.return_value = True
        token = self.generate_token('testdriver')
        response = self.client.put('/driver/orders/1', json={'status': 'delivered'}, headers={'Authorization': f'Bearer {token}'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {'message': 'Order status updated successfully'})
        mock_update_order_status.assert_called_once_with(1, 'testdriver', 'delivered')

    def test_update_order_status_missing_auth_header(self):
        response = self.client.put('/driver/orders/1', json={'status': 'delivered'})
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.get_json(), {'message': 'Missing Authorization header'})

    def test_update_order_status_invalid_token(self):
        response = self.client.put('/driver/orders/1', json={'status': 'delivered'}, headers={'Authorization': 'Bearer invalidtoken'})
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.get_json(), {'message': 'Invalid token'})

    def test_update_order_status_missing_status(self):
        token = self.generate_token('testdriver')
        response = self.client.put('/driver/orders/1', json={}, headers={'Authorization': f'Bearer {token}'})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.get_json(), {'message': 'Missing status in request body'})

    @patch('Service.driver_service.DriverService.update_order_status')
    def test_update_order_status_failure(self, mock_update_order_status):
        mock_update_order_status.return_value = False
        token = self.generate_token('testdriver')
        response = self.client.put('/driver/orders/1', json={'status': 'delivered'}, headers={'Authorization': f'Bearer {token}'})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.get_json(), {'message': 'Failed to update order status'})
        mock_update_order_status.assert_called_once_with(1, 'testdriver', 'delivered')

if __name__ == '__main__':
    unittest.main()
