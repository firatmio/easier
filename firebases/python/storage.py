try:
    import pyrebase
    import json
except ImportError as e:
    raise ImportError(e)


class StorageError(Exception):
    pass


class FirebaseStorage:
    def __init__(self, credentials_path: str):
        """
        Initialize Firebase Storage connection.
        """
        self.credentials_path = credentials_path
        with open(self.credentials_path, "r", encoding="utf-8") as file:
            config = json.load(file)
        
        self.firebase = pyrebase.initialize_app(config)
        self.storage = self.firebase.storage()

    def upload_file(self, local_path: str, remote_path: str):
        """
        Upload a local file to Firebase Storage at the given remote path.
        """
        try:
            self.storage.child(remote_path).put(local_path)
        except Exception as e:
            raise StorageError(f"Failed to upload file '{local_path}' to '{remote_path}'") from e

    def download_file(self, remote_path: str, local_path: str):
        """
        Download a file from Firebase Storage to a local path.
        """
        try:
            self.storage.child(remote_path).download(local_path)
        except Exception as e:
            raise StorageError(f"Failed to download file '{remote_path}' to '{local_path}'") from e

    def delete_file(self, remote_path: str):
        """
        Delete a file from Firebase Storage.
        """
        try:
            self.storage.delete(remote_path)
        except Exception as e:
            raise StorageError(f"Failed to delete file '{remote_path}' from Storage") from e
