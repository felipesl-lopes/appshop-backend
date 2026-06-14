import { Injectable } from '@nestjs/common';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import serviceAccount from '../../firebase-key.json';

@Injectable()
export class FirebaseService {
  constructor() {
    if (!getApps().length) {
      initializeApp({
        credential: cert(serviceAccount as any),
        databaseURL: 'https://shop-df68d-default-rtdb.firebaseio.com/',
      });
    }
  }

  getDatabase() {
    return getDatabase();
  }
}
