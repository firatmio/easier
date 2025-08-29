try:
    import pyrebase
    import json
    from pyrebase import initialize_app
    from requests.exceptions import HTTPError
except ImportError as e:
    raise ImportError(e)


class LoginError(Exception):
    pass

class UserCreationError(Exception):
    pass

class FirebaseAuth:
    def __init__(self, credentials_path: str):
        self.credentials_path = credentials_path
        with open(self.credentials_path, "r", encoding="utf-8") as file:
            config = json.load(file)
        firebase = pyrebase.initialize_app(config)
        self.auth = firebase.auth()
    
    def sign_in_with_email(self, email: str, password: str) -> dict:
        """
        Sign in a user with email and password.
        Returns a dict with email and idToken.
        Raises LoginError if login fails.
        """
        try:
            user = self.auth.sign_in_with_email_and_password(email=email, password=password)
            return {"email": email, "idToken": user['idToken']}
        except HTTPError as e:
            raise LoginError("The ‘email’ and ‘password’ combination is incorrect.") from e
    
    def create_user(self, email: str, password: str) -> dict:
        """
        Create a new user.
        Raises UserCreationError if creation fails.
        """
        try:
            user = self.auth.create_user_with_email_and_password(email=email, password=password)
            return {"email": email, "uid": user['localId']}
        except HTTPError as e:
            raise UserCreationError(f"Failed to create user '{email}'.") from e

    def get_user_info(self, id_token: str) -> dict:
        """
        Get Firebase user info using idToken.
        """
        try:
            info = self.auth.get_account_info(id_token)
            return info
        except HTTPError as e:
            raise LoginError("Failed to fetch user info.") from e
