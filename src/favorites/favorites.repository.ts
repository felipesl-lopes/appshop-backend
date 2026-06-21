import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class FavoritesRepository {
  constructor(private readonly firebaseService: FirebaseService) {}

  async carregarFavoritos(userId: string): Promise<string[]> {
    const snapshot = await this.firebaseService
      .getDatabase()
      .ref(`userFavorites/${userId}`)
      .get();

    const data = snapshot.val() as Record<string, boolean> | null;

    if (!data) return [];

    return Object.entries(data)
      .filter(([, isFavorite]) => isFavorite === true)
      .map(([productId]) => productId);
  }

  async adicionarFavorito(userId: string, productId: string): Promise<void> {
    try {
      await this.firebaseService
        .getDatabase()
        .ref(`userFavorites/${userId}/${productId}`)
        .set(true);
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
      throw error;
    }
  }

  async removerFavorito(userId: string, productId: string): Promise<void> {
    await this.firebaseService
      .getDatabase()
      .ref(`userFavorites/${userId}/${productId}`)
      .remove();
  }
}
