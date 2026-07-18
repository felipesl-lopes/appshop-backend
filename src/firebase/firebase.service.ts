import { Injectable } from '@nestjs/common';
import {
  cert,
  getApps,
  initializeApp,
  ServiceAccount,
} from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';
import serviceAccount from '../../firebase-key.json';

@Injectable()
export class FirebaseService {
  constructor() {
    if (!getApps().length) {
      initializeApp({
        credential: cert(serviceAccount as string | ServiceAccount),
        databaseURL: 'https://shop-df68d-default-rtdb.firebaseio.com/',
      });
    }
  }

  getDatabase() {
    return getDatabase();
  }

  getAuth() {
    return getAuth();
  }
}
