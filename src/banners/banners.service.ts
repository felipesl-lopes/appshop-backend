import { Injectable } from '@nestjs/common';
import { BannersRepository } from './banners.repository';
import { Banners } from './banners.interface';

@Injectable()
export class BannersService {
  constructor(private readonly bannersRepository: BannersRepository) {}

  async getBanners(): Promise<Banners[]> {
    return this.bannersRepository.getBanners();
  }
}
