import unittest
from Test.auth_test import AuthMicroserviceTestCase
from Test.client_test import ClientMicroserviceTestCase
from Test.driver_test import DriverMicroserviceTestCase
from Test.employee_test import EmployeeMicroserviceTestCase
from Test.order_test import OrderMicroserviceTestCase

if __name__ == '__main__':
    test_classes = [AuthMicroserviceTestCase, ClientMicroserviceTestCase, DriverMicroserviceTestCase, EmployeeMicroserviceTestCase, OrderMicroserviceTestCase]

    loader = unittest.TestLoader()

    suites_list = []
    for test_class in test_classes:
        suite = loader.loadTestsFromTestCase(test_class)
        suites_list.append(suite)

    big_suite = unittest.TestSuite(suites_list)
    unittest.TextTestRunner().run(big_suite)