import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('userFavorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get(':userId')
  async carregarFavoritos(@Param('userId') userId: string): Promise<string[]> {
    return this.favoritesService.carregarFavoritos(userId);
  }

  @Put(':userId/:productId')
  async adicionarFavorito(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ): Promise<void> {
    await this.favoritesService.adicionarFavorito(userId, productId);
  }

  @Delete(':userId/:productId')
  async removerFavorito(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ): Promise<void> {
    await this.favoritesService.removerFavorito(userId, productId);
  }
}
