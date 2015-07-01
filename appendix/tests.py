from django.test import TestCase


class AuthenticationTests(TestCase):

    def test_create_account_missing_data(self):
        resp = self.client.post('/api/v1/accounts/')
        self.assertEqual(400, resp.status_code)

    def test_create_account_missing_password(self):
        resp = self.client.post('/api/v1/accounts/', data={
            'username': 'john',
            'email': 'john@example.com'
        })
        self.assertEqual(400, resp.status_code)

    def test_create_account_missing_username(self):
        resp = self.client.post('/api/v1/accounts/', data={
            'password': 'pass',
            'email': 'john@example.com'
        })
        self.assertEqual(400, resp.status_code)

    def test_create_account_missing_email(self):
        resp = self.client.post('/api/v1/accounts/', data={
            'username': 'john',
            'password': 'pass',
        })
        self.assertEqual(400, resp.status_code)

    def test_create_account_minimum_data(self):
        data = {
            'username': 'john',
            'password': 'pass',
            'email': 'john@example.com'
        }
        resp = self.client.post('/api/v1/accounts/', data=data)
        self.assertEqual(201, resp.status_code)
