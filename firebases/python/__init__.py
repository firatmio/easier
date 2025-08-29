from .auth import FirebaseAuth
from .storage import FirebaseStorage
from .realtime import FirebaseRealtimeDB
from .firestore import FirestoreDatabase

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
        self.realtimedb = FirebaseRealtimeDB(credentials_path)
        self.firestore = FirestoreDatabase(credentials_path)


__all__ = ["EasierFirebase"]
__version__ = "0.1.0"
