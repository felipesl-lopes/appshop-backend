import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Categories } from './categories.interface';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getCategories(): Promise<Categories[]> {
    const snapshot = await this.firebaseService
      .getDatabase()
      .ref('categories')
      .get();

    const data = snapshot.val() as Record<
      string,
      Omit<Categories, 'id'>
    > | null;

    if (!data) return [];

    return Object.entries(data).map(([id, category]) => ({
      id,
      ...category,
    }));
  }
}
