const admin = require("firebase-admin");

class FirebaseAuth {
    constructor(firebaseApp) {
        this.app = firebaseApp;
        this.auth = this.app.auth();
    }

    async createUser(email, password) {
        try {
            const userRecord = await this.auth.createUser({
                email,
                password,
            });
            console.log(`[AUTH] User created: ${userRecord.uid}`);
            return userRecord;
        } catch (error) {
            console.error(`[AUTH] Error creating user: ${error.message}`);
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const userRecord = await this.auth.getUserByEmail(email);
            console.log(`[AUTH] User fetched: ${userRecord.uid}`);
            return userRecord;
        } catch (error) {
            console.error(`[AUTH] Error fetching user: ${error.message}`);
            throw error;
        }
    }

    async getUserByUID(uid) {
        try {
            const userRecord = await this.auth.getUser(uid);
            console.log(`[AUTH] User fetched: ${userRecord.uid}`);
            return userRecord;
        } catch (error) {
            console.error(`[AUTH] Error fetching user: ${error.message}`);
            throw error;
        }
    }

    async deleteUser(uid) {
        try {
            await this.auth.deleteUser(uid);
            console.log(`[AUTH] User deleted: ${uid}`);
            return true;
        } catch (error) {
            console.error(`[AUTH] Error deleting user: ${error.message}`);
            throw error;
        }
    }
}

module.exports = FirebaseAuth;
