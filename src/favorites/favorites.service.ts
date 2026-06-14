import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  async carregarFavoritos(userId: string): Promise<string[]> {
    return this.favoritesRepository.carregarFavoritos(userId);
  }
}
