import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAll() {
    const [data, count] = await this.categoryRepository.getAll();
    return { items: data, totalItemsCount: count };
  }

  async getOne(id: string) {
    const category = await this.categoryRepository.getById(id);

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return category;
  }

  async deleteOne(id: string) {
    const response = await this.categoryRepository.remove(id);
    return response;
  }

  async change(value: UpdateCategoryDto, id: string) {
    const response = await this.categoryRepository.update(value, id);
    return response;
  }

  async create(value: CreateCategoryDto) {
    const response = await this.categoryRepository.create(value);
    return response;
  }
}
