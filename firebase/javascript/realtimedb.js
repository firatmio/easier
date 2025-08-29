class FirebaseRealtimeDB {
    constructor(firebaseApp) {
        this.app = firebaseApp;
        this.db = this.app.database();
    }

    async set(path, data) {
        try {
            await this.db.ref(path).set(data);
            return true;
        } catch (error) {
            console.error(`[RealtimeDB] Error setting data: ${error.message}`);
            throw error;
        }
    }

    async get(path) {
        try {
            const snapshot = await this.db.ref(path).once("value");
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                return null;
            }
        } catch (error) {
            console.error(`[RealtimeDB] Error fetching data: ${error.message}`);
            throw error;
        }
    }

    async update(path, data) {
        try {
            await this.db.ref(path).update(data);
            return true;
        } catch (error) {
            console.error(`[RealtimeDB] Error updating data: ${error.message}`);
            throw error;
        }
    }

    async delete(path) {
        try {
            await this.db.ref(path).remove();
            return true;
        } catch (error) {
            console.error(`[RealtimeDB] Error deleting data: ${error.message}`);
            throw error;
        }
    }
}

module.exports = FirebaseRealtimeDB;
