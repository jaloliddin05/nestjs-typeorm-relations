import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, InsertResult, UpdateResult } from 'typeorm';

import { Market } from './market.entity';
import { CreateMarketDto, UpdateMarketDto } from './dto';

@Injectable()
export class MarketRepository {
  constructor(
    @InjectRepository(Market)
    private readonly marketRepository: Repository<Market>,
  ) {}

  async getAll() {
    return this.marketRepository
      .createQueryBuilder('market')
      .leftJoinAndSelect('market.categories', 'category')
      .getManyAndCount();
  }

  async getByCategory(categoryId: string) {
    return this.marketRepository
      .createQueryBuilder('market')
      .leftJoinAndSelect('market.categories', 'category')
      .where('category.id = :id', { id: categoryId })
      .getManyAndCount();
  }

  async getById(id: string): Promise<Market> {
    return this.marketRepository
      .createQueryBuilder('market')
      .where('market.id = :id', { id })
      .leftJoinAndSelect('market.categories', 'category')
      .getOne();
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.marketRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  async create(values: CreateMarketDto): Promise<InsertResult> {
    return this.marketRepository
      .createQueryBuilder()
      .insert()
      .into(Market)
      .values(values as unknown as Market)
      .returning('id')
      .execute();
  }

  async update(values: UpdateMarketDto, id: string): Promise<UpdateResult> {
    return this.marketRepository
      .createQueryBuilder()
      .update(Market)
      .set(values as unknown as Market)
      .where('id = :id', { id })
      .returning('id')
      .execute();
  }
}
