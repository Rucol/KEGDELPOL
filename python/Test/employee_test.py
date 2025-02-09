import unittest
from test_server import create_app, push_app_context
from unittest.mock import patch
from flask import json

class EmployeeMicroserviceTestCase(unittest.TestCase):

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

    def test_add_vehicle_missing_json(self):
        response = self.client.post('/employee/vehicles')
        self.assertEqual(response.status_code, 415)
        self.assertEqual(response.get_json(), None)

    def test_add_vehicle_missing_fields(self):
        incomplete_data = {
            'type': 'Truck'
        }
        response = self.client.post('/employee/vehicles', json=incomplete_data)
        self.assertEqual(response.status_code, 400)
        self.assertIn('Missing required field', response.get_json()['error'])

if __name__ == '__main__':
    unittest.main()
