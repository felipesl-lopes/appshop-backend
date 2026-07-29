import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { AuthenticatedRequest } from 'src/address/authenticate_request.interface';
import { FirebaseAuthGuard } from 'src/auth/firebase_auth_guard';
import type { GerenciaAvaliacao } from './avaliacao.interface';
import { AvaliacaoService } from './avaliacao.service';

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get(':productId')
  async carregarAvaliacoesPorProduto(
    @Param('productId') productId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.avaliacaoService.carregarAvaliacoesPorProduto(
      productId,
      req.user.uid,
    );
  }

  @UseGuards(FirebaseAuthGuard)
  @Post(':productId')
  async enviarAvaliacao(
    @Param('productId') productId: string,
    @Req() req: AuthenticatedRequest,
    @Body() avaliacao: GerenciaAvaliacao,
  ) {
    return this.avaliacaoService.enviarAvaliacao(productId, {
      ...avaliacao,
      usuarioId: req.user.uid,
    });
  }

  @UseGuards(FirebaseAuthGuard)
  @Put(':productId')
  async editarAvaliacao(
    @Param('productId') productId: string,
    @Req() req: AuthenticatedRequest,
    @Body() avaliacao: GerenciaAvaliacao,
  ) {
    return this.avaliacaoService.editarAvaliacao(productId, {
      ...avaliacao,
      usuarioId: req.user.uid,
    });
  }
}
