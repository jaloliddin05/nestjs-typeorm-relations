import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAll() {
    const [data, count] = await this.productRepository.getAll();
    return { items: data, totalItemsCount: count };
  }

  async getOne(id: string) {
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async deleteOne(id: string) {
    const response = await this.productRepository.remove(id);
    return response;
  }

  async change(value: UpdateProductDto, id: string) {
    const response = await this.productRepository.update(value, id);
    return response;
  }

  async create(value: CreateProductDto) {
    const response = await this.productRepository.create(value);
    return response;
  }
}
