import * as admin from 'firebase-admin';
import { FirebaseAuth } from './auth';
import { FirebaseFirestore } from './firestore';
import { FirebaseRealtimeDB } from './realtimedb';
import { FirebaseStorage } from './storage';

export class EasierFirebase {
    private static instance: EasierFirebase;
    private app: admin.app.App;

    private constructor(serviceAccount: admin.ServiceAccount | string) {
        let cert: admin.ServiceAccount;
        if (typeof serviceAccount === 'string') {
            // If it's a path, require it
            cert = require(serviceAccount);
        } else {
            // If it's an object, use it directly
            cert = serviceAccount;
        }

        if (!admin.apps.length) {
            this.app = admin.initializeApp({
                credential: admin.credential.cert(cert),
            });
        } else {
            this.app = admin.app();
        }
    }

    public static getInstance(serviceAccount: admin.ServiceAccount | string): EasierFirebase {
        if (!EasierFirebase.instance) {
            EasierFirebase.instance = new EasierFirebase(serviceAccount);
        }
        return EasierFirebase.instance;
    }

    public auth(): FirebaseAuth {
        return new FirebaseAuth(this.app);
    }

    public firestore(): FirebaseFirestore {
        return new FirebaseFirestore(this.app);
    }

    public realtimedb(): FirebaseRealtimeDB {
        return new FirebaseRealtimeDB(this.app);
    }

    public storage(): FirebaseStorage {
        return new FirebaseStorage(this.app);
    }
}
