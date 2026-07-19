import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Categories } from './categories.interface';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async getCategories(): Promise<Categories[]> {
    return this.categoriesRepository.getCategories();
  }

  async addCategory(name: string): Promise<void> {
    return this.categoriesRepository.addCategory(name);
  }
}
