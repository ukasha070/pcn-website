import requests
from datetime import datetime, timedelta
from django.core.cache import cache
from django.conf import settings

PESAPAL_CONSUMER_KEY = getattr(settings, 'PESAPAL_CONSUMER_KEY', None)
PESAPAL_CONSUMER_SECRET = getattr(settings, 'PESAPAL_CONSUMER_SECRET', None)

GET_PESAPAL_AUTH_TOKEN_URL = getattr(
    settings, 'GET_PESAPAL_AUTH_TOKEN_URL', None)

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

payload = {
    "consumer_key": PESAPAL_CONSUMER_KEY,
    "consumer_secret": PESAPAL_CONSUMER_SECRET
}


class PesapalAPI:
    def __init__(self):
        self.token = None
        self.token_expiry = None

    def get_pesapal_token(self):
        token_info = cache.get('pesapal_token_info')

        # Check if the token exists and if it is still valid
        if not token_info or self.is_token_expired(token_info["expiry_time"]):
            # Token is either not present or expired
            token_info = self.request_new_token()

        return token_info["token"]

    def is_token_expired(self, expiry_time):
        """Check if the token has expired."""
        return datetime.now() > expiry_time

    def request_new_token(self):
        """Request a new token from Pesapal and store it in cache."""
        try:
            response = requests.post(
                GET_PESAPAL_AUTH_TOKEN_URL, headers=headers, json=payload, timeout=10)

            response.raise_for_status()  # Will raise an exception for non-2xx status codes

            data = response.json()
            token = data.get("token")

            if token:
                expiry_time = datetime.now() + timedelta(minutes=5)  # Token expires in 5 minutes
                token_info = {
                    "token": token,
                    "expiry_time": expiry_time
                }
                # Store the token info in cache
                cache.set('pesapal_token_info', token_info,
                          timeout=3600)  # Cache for 1 hour
                self.token = token
                self.token_expiry = expiry_time
                return token_info
            else:
                raise Exception("Token not found in the response")
        except requests.exceptions.RequestException as e:
            raise Exception(f"Failed to get new Pesapal token: {str(e)}")


pesapal_api = PesapalAPI()


def extract_names(full_name: str) -> dict:
    name_parts = full_name.split()
    if len(name_parts) >= 1:
        return {"first_name": name_parts[0], "last_name": name_parts[-1]}
    else:
        return {"first_name": name_parts[0], "last_name": name_parts[0]}


def get_country_code(country_name):
    country_dict = {
        'Uganda': 'UG',
        'Kenya': 'KE',
        'Tanzania': 'TZ',
        'Rwanda': 'RW',
        'Malawi': 'MW',
        'Zambia': 'ZM',
        'Zimbabwe': 'ZW'
    }

    return country_dict.get(country_name, "UG")
