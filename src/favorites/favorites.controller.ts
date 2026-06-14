import { Controller, Get, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('userFavorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get(':userId')
  async carregarFavoritos(@Param('userId') userId: string): Promise<string[]> {
    return this.favoritesService.carregarFavoritos(userId);
  }
}
