import { Body, Controller, Param, Post } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import type { CriarAvaliacao } from './avaliacao.interface';

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post(':productId')
  async enviarAvaliacao(
    @Param('productId') productId: string,
    @Body() avaliacao: CriarAvaliacao,
  ) {
    return this.avaliacaoService.enviarAvaliacao(productId, avaliacao);
  }
}
