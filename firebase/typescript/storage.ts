import * as admin from 'firebase-admin';
import { getStorage } from 'firebase-admin/storage';

export class FirebaseStorage {
    private storage: admin.storage.Storage;

    constructor(firebaseApp: admin.app.App) {
        this.storage = getStorage(firebaseApp);
    }

    async upload(localPath: string, remotePath: string): Promise<boolean> {
        try {
            await this.storage.bucket().upload(localPath, {
                destination: remotePath,
            });
            return true;
        } catch (error: any) {
            console.error(`[STORAGE] Error uploading file: ${error.message}`);
            throw error;
        }
    }

    async download(remotePath: string, localPath: string): Promise<boolean> {
        try {
            const file = this.storage.bucket().file(remotePath);
            await file.download({ destination: localPath });
            return true;
        } catch (error: any) {
            console.error(`[STORAGE] Error downloading file: ${error.message}`);
            throw error;
        }
    }

    async delete(remotePath: string): Promise<boolean> {
        try {
            const file = this.storage.bucket().file(remotePath);
            await file.delete();
            return true;
        } catch (error: any) {
            console.error(`[STORAGE] Error deleting file: ${error.message}`);
            throw error;
        }
    }
}
