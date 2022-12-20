import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, InsertResult, UpdateResult } from 'typeorm';

import { Category } from './category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAll() {
    return this.categoryRepository
      .createQueryBuilder('category')
      .getManyAndCount();
  }

  async getById(id: string): Promise<Category> {
    return this.categoryRepository
      .createQueryBuilder('category')
      .where('id = :id', { id })
      .getOne();
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.categoryRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  async create(values: CreateCategoryDto): Promise<InsertResult> {
    return this.categoryRepository
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values(values as unknown as Category)
      .returning('id')
      .execute();
  }

  async update(values: UpdateCategoryDto, id: string): Promise<UpdateResult> {
    return this.categoryRepository
      .createQueryBuilder()
      .update(Category)
      .set(values as unknown as Category)
      .where('id = :id', { id })
      .returning('id')
      .execute();
  }
}
