class FirebaseStorage {
    constructor(firebaseApp) {
        this.app = firebaseApp;
        this.storage = this.app.storage();
    }

    async upload(localPath, remotePath) {
        try {
            await this.storage.bucket().upload(localPath, {
                destination: remotePath,
            });
            return true;
        } catch (error) {
            console.error(`[STORAGE] Error uploading file: ${error.message}`);
            throw error;
        }
    }

    async download(remotePath, localPath) {
        try {
            const file = this.storage.bucket().file(remotePath);
            await file.download({ destination: localPath });
            return true;
        } catch (error) {
            console.error(`[STORAGE] Error downloading file: ${error.message}`);
            throw error;
        }
    }

    async delete(remotePath) {
        try {
            const file = this.storage.bucket().file(remotePath);
            await file.delete();
            return true;
        } catch (error) {
            console.error(`[STORAGE] Error deleting file: ${error.message}`);
            throw error;
        }
    }
}

module.exports = FirebaseStorage;
