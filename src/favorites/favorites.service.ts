import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  async carregarFavoritos(userId: string): Promise<string[]> {
    return this.favoritesRepository.carregarFavoritos(userId);
  }

  async adicionarFavorito(userId: string, productId: string): Promise<void> {
    await this.favoritesRepository.adicionarFavorito(userId, productId);
  }

  async removerFavorito(userId: string, productId: string): Promise<void> {
    await this.favoritesRepository.removerFavorito(userId, productId);
  }
}
