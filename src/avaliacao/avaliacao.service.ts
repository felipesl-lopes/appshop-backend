import { Injectable } from '@nestjs/common';
import { AvaliacaoRepository } from './avaliacao.repository';
import type { CriarAvaliacao } from './avaliacao.interface';

@Injectable()
export class AvaliacaoService {
  constructor(private readonly avaliacaoRepository: AvaliacaoRepository) {}

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
