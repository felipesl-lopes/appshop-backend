import { Injectable } from '@nestjs/common';
import { AvaliacaoRepository } from './avaliacao.repository';
import type { Avaliacao, CriarAvaliacao } from './avaliacao.interface';

@Injectable()
export class AvaliacaoService {
  constructor(private readonly avaliacaoRepository: AvaliacaoRepository) {}

  async carregarAvaliacoesPorProduto(productId: string): Promise<Avaliacao[]> {
    return this.avaliacaoRepository.carregarAvaliacoesPorProduto(productId);
  }

  async enviarAvaliacao(
    productId: string,
    avaliacao: CriarAvaliacao,
  ): Promise<string> {
    return this.avaliacaoRepository.enviarAvaliacao(productId, {
      ...avaliacao,
      dataCriacao: new Date().toISOString(),
    });
  }
}
