import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import type { CriarAvaliacao } from './avaliacao.interface';
import { FirebaseAuthGuard } from 'src/auth/firebase_auth_guard';
import type { AuthenticatedRequest } from 'src/address/authenticate_request.interface';

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Get(':productId')
  async carregarAvaliacoesPorProduto(@Param('productId') productId: string) {
    return this.avaliacaoService.carregarAvaliacoesPorProduto(productId);
  }

  @UseGuards(FirebaseAuthGuard)
  @Post(':productId')
  async enviarAvaliacao(
    @Param('productId') productId: string,
    @Req() req: AuthenticatedRequest,
    @Body() avaliacao: CriarAvaliacao,
  ) {
    return this.avaliacaoService.enviarAvaliacao(productId, {
      ...avaliacao,
      usuarioId: req.user.uid,
    });
  }
}
