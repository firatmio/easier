# Easier

> Making powerful frameworks, intuitively simple.

<div align="center">

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)](https://github.com/easier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-orange.svg?style=for-the-badge)](https://github.com/easier)

</div>

---

## ✨ About The Project

**Easier** is an open-source initiative dedicated to simplifying the developer experience. We create intuitive, high-level wrappers for popular frameworks across various programming languages.

Our mission is to:
*   **Reduce Boilerplate:** Write less, do more. Focus on your application's logic, not on repetitive setup code.
*   **Flatten the Learning Curve:** Get started with powerful tools faster than ever before.
*   **Improve Readability:** Create clean, elegant, and maintainable code with a simplified syntax.

We believe that powerful tools don't have to be complicated. `Easier` abstracts away the complexity without sacrificing the underlying functionality.

## 🚀 Currently Available Wrappers

Our collection of wrappers is constantly growing. Here is what we currently support:

| Language | Framework | Available Modules | Status |
| :--- | :--- | :--- | :---: |
| **🐍 Python** | `Firebase` | `auth`, `firestore`, `realtime`, `storage` | ✅ Actively Developed |
| **📜 JavaScript** | `Firebase` | `auth`, `firestore`, `realtimedb`, `storage` | ✅ Actively Developed |

<br/>

## 💡 Quick Start: Python Firebase Example

See how `easier` transforms Firebase interactions in Python.

**Without `easier` (Standard Firebase Admin SDK):**
```python
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("path/to/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# Add data
doc_ref = db.collection(u'users').document(u'alovelace')
doc_ref.set({
    u'first': u'Ada',
    u'last': u'Lovelace',
    u'born': 1815
})

# Read data
users_ref = db.collection(u'users')
docs = users_ref.stream()

for doc in docs:
    print(f'{doc.id} => {doc.to_dict()}')
```

**With `easier`:**
```python
from easier_py import EasierFirebase

# 1. Initialize the database with your credentials
app = EasierFirebase("path/to/serviceAccountKey.json")
db = app.realtimedb()

data = {
    'alovelace': {
        'first': 'Ada',
        'last': 'Lovelace',
        'born': 1815
    }
}

# 2. Set data for a document
db.set('users', data)

# 3. Get data from a document
user_data = db.get('users', 'alovelace')
print(user_data)
# Expected output: {'first': 'Ada', 'last': 'Lovelace', 'born': 1815}
```
*Notice that the initialization is simplified into a single object, and data operations are straightforward method calls.*

---

## 🤝 Contributing

This project thrives on community contributions. If you are interested in simplifying a framework you love, please feel free to open an issue or submit a pull request.

We welcome contributions of all kinds:
*   Adding new language wrappers.
*   Expanding existing framework modules.
*   Improving documentation.
*   Reporting bugs.

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
