try:
    import pyrebase
    import json
    from pyrebase import initialize_app
except ImportError as e:
    raise ImportError(e)


class RealtimeDBError(Exception):
    pass


class FirebaseRealtimeDB:
    def __init__(self, credentials_path: str):
        """
        Initialize Realtime Database connection.
        """
        self.credentials_path = credentials_path
        with open(self.credentials_path, "r", encoding="utf-8") as file:
            config = json.load(file)
        
        self.firebase = pyrebase.initialize_app(config)
        self.db = self.firebase.database()

    def set(self, path: str, data: dict):
        """
        Set data at a specific path in Realtime Database.
        """
        try:
            self.db.child(path).set(data)
        except Exception as e:
            raise RealtimeDBError(f"Failed to set Realtime DB data at '{path}'") from e

    def get(self, path: str) -> dict:
        """
        Get data from a specific path in Realtime Database.
        """
        try:
            result = self.db.child(path).get()
            return result.val()
        except Exception as e:
            raise RealtimeDBError(f"Failed to get Realtime DB data from '{path}'") from e
