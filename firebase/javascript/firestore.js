class FirebaseFirestore {
    constructor(firebaseApp) {
        this.app = firebaseApp;
        this.db = this.app.firestore();
    }

    async set(docPath, data) {
        try {
            await this.db.doc(docPath).set(data);
            return true;
        } catch (error) {
            console.error(`[Firestore] Error setting document: ${error.message}`);
            throw error;
        }
    }

    async get(docPath) {
        try {
            const doc = await this.db.doc(docPath).get();
            if (doc.exists) {
                return doc.data();
            } else {
                console.log(`[Firestore] Document ${docPath} does not exist`);
                return null;
            }
        } catch (error) {
            console.error(`[Firestore] Error fetching document: ${error.message}`);
            throw error;
        }
    }

    async update(docPath, data) {
        try {
            await this.db.doc(docPath).update(data);
            return true;
        } catch (error) {
            console.error(`[Firestore] Error updating document: ${error.message}`);
            throw error;
        }
    }

    async delete(docPath) {
        try {
            await this.db.doc(docPath).delete();
            return true;
        } catch (error) {
            console.error(`[Firestore] Error deleting document: ${error.message}`);
            throw error;
        }
    }
}

module.exports = FirebaseFirestore;
