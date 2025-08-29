import * as admin from 'firebase-admin';
import { getFirestore, DocumentData } from 'firebase-admin/firestore';

export class FirebaseFirestore {
    private db: admin.firestore.Firestore;

    constructor(firebaseApp: admin.app.App) {
        this.db = getFirestore(firebaseApp);
    }

    async set<T extends DocumentData>(docPath: string, data: T): Promise<boolean> {
        try {
            await this.db.doc(docPath).set(data);
            return true;
        } catch (error: any) {
            console.error(`[Firestore] Error setting document: ${error.message}`);
            throw error;
        }
    }

    async get<T extends DocumentData>(docPath: string): Promise<T | null> {
        try {
            const doc = await this.db.doc(docPath).get();
            if (doc.exists) {
                return doc.data() as T;
            } else {
                console.log(`[Firestore] Document ${docPath} does not exist`);
                return null;
            }
        } catch (error: any) {
            console.error(`[Firestore] Error fetching document: ${error.message}`);
            throw error;
        }
    }

    async update<T extends DocumentData>(docPath: string, data: Partial<T>): Promise<boolean> {
        try {
            await this.db.doc(docPath).update(data);
            return true;
        } catch (error: any) {
            console.error(`[Firestore] Error updating document: ${error.message}`);
            throw error;
        }
    }

    async delete(docPath: string): Promise<boolean> {
        try {
            await this.db.doc(docPath).delete();
            return true;
        } catch (error: any) {
            console.error(`[Firestore] Error deleting document: ${error.message}`);
            throw error;
        }
    }
}
