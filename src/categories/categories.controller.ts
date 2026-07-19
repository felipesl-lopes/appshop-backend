import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from './categories.interface';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories(): Promise<Categories[]> {
    return this.categoriesService.getCategories();
  }

  @Post()
  async addCategory(@Body() name: string): Promise<void> {
    return this.categoriesService.addCategory(name);
  }
}
