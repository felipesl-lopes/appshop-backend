import { Injectable } from '@nestjs/common';
import type {
  AvaliacaoResponse,
  GerenciaAvaliacao,
} from './avaliacao.interface';
import { AvaliacaoRepository } from './avaliacao.repository';

@Injectable()
export class AvaliacaoService {
  constructor(private readonly avaliacaoRepository: AvaliacaoRepository) {}

  async carregarAvaliacoesPorProduto(
    productId: string,
    userId: string,
  ): Promise<AvaliacaoResponse[]> {
    return this.avaliacaoRepository.carregarAvaliacoesPorProduto(
      productId,
      userId,
    );
  }

  async enviarAvaliacao(
    productId: string,
    avaliacao: GerenciaAvaliacao,
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

  async editarAvaliacao(
    productId: string,
    avaliacao: GerenciaAvaliacao,
  ): Promise<{
    notaMedia: number;
    totalAvaliacoes: number;
  }> {
    return this.avaliacaoRepository.editarAvaliacao(productId, {
      ...avaliacao,
      dataCriacao: new Date().toISOString(),
    });
  }
}
