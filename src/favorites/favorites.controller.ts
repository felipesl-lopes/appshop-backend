import { Controller, Delete, Param, Put, Req, UseGuards } from '@nestjs/common';
import type { AuthenticatedRequest } from 'src/address/authenticate_request.interface';
import { FirebaseAuthGuard } from 'src/auth/firebase_auth_guard';
import { FavoritesService } from './favorites.service';

@Controller('userFavorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(FirebaseAuthGuard)
  @Put(':productId')
  async adicionarFavorito(
    @Req() req: AuthenticatedRequest,
    @Param('productId') productId: string,
  ): Promise<void> {
    await this.favoritesService.adicionarFavorito(req.user.uid, productId);
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete(':productId')
  async removerFavorito(
    @Req() req: AuthenticatedRequest,
    @Param('productId') productId: string,
  ): Promise<void> {
    await this.favoritesService.removerFavorito(req.user.uid, productId);
  }
}
