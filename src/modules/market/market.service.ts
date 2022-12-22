import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { MarketRepository } from './market.repository';
import { CreateMarketDto, MarketCategoryDto, UpdateMarketDto } from './dto';
import { CategoryRepository } from '../category/category.repository';
@Injectable()
export class MarketService {
  constructor(
    private readonly marketRepository: MarketRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly connection: DataSource,
  ) {}

  async getAll() {
    const [data, count] = await this.marketRepository.getAll();
    return { items: data, totalItemsCount: count };
  }

  async getOne(id: string) {
    const market = await this.marketRepository.getById(id);

    if (!market) {
      throw new HttpException('Market not found', HttpStatus.NOT_FOUND);
    }
    return market;
  }

  async deleteOne(id: string) {
    const response = await this.marketRepository.remove(id);
    return response;
  }

  async change(value: UpdateMarketDto, id: string) {
    const response = await this.marketRepository.update(value, id);
    return response;
  }

  async create(value: CreateMarketDto) {
    const response = await this.marketRepository.create(value);
    return response;
  }

  async addCategory(value: MarketCategoryDto) {
    const market = await this.marketRepository.getById(value.marketId);
    const category = await this.categoryRepository.getById(value.categoryId);

    market.categories = market.categories || [];
    market.categories.push(category);

    await this.connection.transaction(async (manager: EntityManager) => {
      await manager.save(market);
    });

    return market;
  }

  async deleteCategory(value: MarketCategoryDto) {
    const market = await this.marketRepository.getById(value.marketId);

    market.categories = market.categories
      ? market.categories.filter((c) => c.id != value.categoryId)
      : [];

    await this.connection.transaction(async (manager: EntityManager) => {
      await manager.save(market);
    });

    return market;
  }

  async getMarketsByCategory(categoryId: string) {
    const [data, count] = await this.marketRepository.getByCategory(categoryId);
    return { items: data, totalItemsCount: count };
  }
}
