try:
    import json
    import firebase_admin
    from firebase_admin import credentials, firestore
except ImportError as e:
    raise ImportError(e)


class FirestoreError(Exception):
    pass


class FirestoreDatabase:
    def __init__(self, credentials_path: str):
        """
        Initialize Firestore connection.
        """
        self.credentials_path = credentials_path
        self.cred = credentials.Certificate(self.credentials_path)
        try:
            self.app = firebase_admin.get_app()
        except ValueError:
            self.app = firebase_admin.initialize_app(self.cred)
        self.db = firestore.client()

    def set_data(self, collection: str, doc_id: str, data: dict):
        """
        Set data in Firestore for a specific document.
        """
        try:
            doc_ref = self.db.collection(collection).document(doc_id)
            doc_ref.set(data)
        except Exception as e:
            raise FirestoreError(f"Failed to set Firestore data at '{collection}/{doc_id}'") from e

    def get_data(self, collection: str, doc_id: str) -> dict:
        """
        Get data from Firestore for a specific document.
        """
        try:
            doc_ref = self.db.collection(collection).document(doc_id)
            doc = doc_ref.get()
            if doc.exists:
                return doc.to_dict()
            return {}
        except Exception as e:
            raise FirestoreError(f"Failed to get Firestore data from '{collection}/{doc_id}'") from e
