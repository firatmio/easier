try:
    import firebase_admin
    from firebase_admin import credentials, db, auth, firestore, storage
except ImportError as e:
    raise ImportError(e)

class EFirebase:
    def __init__(self, cred: str):
        