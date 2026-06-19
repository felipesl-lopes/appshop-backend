import { Controller, Get } from '@nestjs/common';
import { BannersService } from './banners.service';
import { Banners } from './banners.interface';

@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get()
  async getBanners(): Promise<Banners[]> {
    return this.bannersService.getBanners();
  }
}
