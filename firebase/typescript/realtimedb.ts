import * as admin from 'firebase-admin';
import { getDatabase } from 'firebase-admin/database';

export class FirebaseRealtimeDB {
    private db: admin.database.Database;

    constructor(firebaseApp: admin.app.App) {
        this.db = getDatabase(firebaseApp);
    }

    async set(path: string, data: any): Promise<boolean> {
        try {
            await this.db.ref(path).set(data);
            return true;
        } catch (error: any) {
            console.error(`[RealtimeDB] Error setting data: ${error.message}`);
            throw error;
        }
    }

    async get(path: string): Promise<any | null> {
        try {
            const snapshot = await this.db.ref(path).once("value");
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                return null;
            }
        } catch (error: any) {
            console.error(`[RealtimeDB] Error fetching data: ${error.message}`);
            throw error;
        }
    }

    async update(path: string, data: object): Promise<boolean> {
        try {
            await this.db.ref(path).update(data);
            return true;
        } catch (error: any) {
            console.error(`[RealtimeDB] Error updating data: ${error.message}`);
            throw error;
        }
    }

    async delete(path: string): Promise<boolean> {
        try {
            await this.db.ref(path).remove();
            return true;
        } catch (error: any) {
            console.error(`[RealtimeDB] Error deleting data: ${error.message}`);
            throw error;
        }
    }
}
