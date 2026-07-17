import { Injectable } from '@nestjs/common';
import type { AvaliacaoResponse, CriarAvaliacao } from './avaliacao.interface';
import { AvaliacaoRepository } from './avaliacao.repository';

@Injectable()
export class AvaliacaoService {
  constructor(private readonly avaliacaoRepository: AvaliacaoRepository) {}

  async carregarAvaliacoesPorProduto(
    productId: string,
  ): Promise<AvaliacaoResponse[]> {
    return this.avaliacaoRepository.carregarAvaliacoesPorProduto(productId);
  }

  async enviarAvaliacao(
    productId: string,
    avaliacao: CriarAvaliacao,
  ): Promise<{
    avaliacaoId: string;
    notaMedia: number;
    totalAvaliacoes: number;
  }> {
    return this.avaliacaoRepository.enviarAvaliacao(productId, {
      ...avaliacao,
      dataCriacao: new Date().toISOString(),
    });
  }
}
