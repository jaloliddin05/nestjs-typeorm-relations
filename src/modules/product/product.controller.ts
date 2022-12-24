import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  Delete,
  Patch,
  Param,
  Get,
} from '@nestjs/common';

import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Product } from './product.entity';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  @ApiOkResponse({
    description: 'The products were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData(): Promise<{ items: Product[]; totalItemsCount: number }> {
    try {
      return await this.productService.getAll();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'The product was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<Product> {
    return this.productService.getOne(id);
  }

  @Post('/')
  @ApiCreatedResponse({
    description: 'The product was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(
    @Body() categoryData: CreateProductDto,
  ): Promise<InsertResult> {
    try {
      return await this.productService.create(categoryData);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('/:id')
  @ApiOkResponse({
    description: 'Product was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() categoryData: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    try {
      return await this.productService.change(categoryData, id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Product was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string): Promise<DeleteResult> {
    try {
      return await this.productService.deleteOne(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
