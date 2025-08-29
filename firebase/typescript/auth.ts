import * as admin from 'firebase-admin';
import { getAuth, UserRecord } from 'firebase-admin/auth';

export class FirebaseAuth {
    private auth: admin.auth.Auth;

    constructor(firebaseApp: admin.app.App) {
        this.auth = getAuth(firebaseApp);
    }

    async createUser(email: string, password: string): Promise<UserRecord> {
        try {
            const userRecord = await this.auth.createUser({
                email,
                password,
            });
            console.log(`[AUTH] User created: ${userRecord.uid}`);
            return userRecord;
        } catch (error: any) {
            console.error(`[AUTH] Error creating user: ${error.message}`);
            throw error;
        }
    }

    async getUserByEmail(email: string): Promise<UserRecord> {
        try {
            const userRecord = await this.auth.getUserByEmail(email);
            console.log(`[AUTH] User fetched: ${userRecord.uid}`);
            return userRecord;
        } catch (error: any) {
            console.error(`[AUTH] Error fetching user: ${error.message}`);
            throw error;
        }
    }

    async getUserByUID(uid: string): Promise<UserRecord> {
        try {
            const userRecord = await this.auth.getUser(uid);
            console.log(`[AUTH] User fetched: ${userRecord.uid}`);
            return userRecord;
        } catch (error: any) {
            console.error(`[AUTH] Error fetching user: ${error.message}`);
            throw error;
        }
    }

    async deleteUser(uid: string): Promise<boolean> {
        try {
            await this.auth.deleteUser(uid);
            console.log(`[AUTH] User deleted: ${uid}`);
            return true;
        } catch (error: any) {
            console.error(`[AUTH] Error deleting user: ${error.message}`);
            throw error;
        }
    }
}
