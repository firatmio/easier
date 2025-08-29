const admin = require("firebase-admin");
const FirebaseAuth = require("./auth");
const FirebaseStorage = require("./storage");
const FirebaseDatabase = require("./database");

class EasierFirebase {
    constructor(credentialsPath) {
        const serviceAccount = require(credentialsPath);

        this.app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });

        this.auth = new FirebaseAuth(this.app);
        this.storage = new FirebaseStorage(this.app);
        this.database = new FirebaseDatabase(this.app);
    }
}

module.exports = EasierFirebase;
