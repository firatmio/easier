from .auth import FirebaseAuth
from .storage import FirebaseStorage
from .database import FirebaseDatabase

class EasierFirebase:
    """
    EasierFirebase
    --------------
    Simplified wrapper for Firebase services.
    User provides credentials once, and all services
    (Auth, Storage, Database) are initialized with it.
    """

    def __init__(self, credentials_path: str):
        self.auth = FirebaseAuth(credentials_path)
        self.storage = FirebaseStorage(credentials_path)
        self.database = FirebaseDatabase(credentials_path)


__all__ = ["EasierFirebase"]
__version__ = "0.1.0"
