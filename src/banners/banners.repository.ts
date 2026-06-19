import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Banners } from './banners.interface';

@Injectable()
export class BannersRepository {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getBanners(): Promise<Banners[]> {
    const snapshot = await this.firebaseService
      .getDatabase()
      .ref('banners')
      .get();

    const data = snapshot.val() as Record<string, Omit<Banners, 'id'>> | null;

    if (!data) return [];

    return Object.entries(data).map(([id, banners]) => ({
      id,
      ...banners,
    }));
  }
}
