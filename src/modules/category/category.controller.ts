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

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all categories' })
  @ApiOkResponse({
    description: 'The categories were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData(): Promise<{ items: Category[]; totalItemsCount: number }> {
    try {
      return await this.categoryService.getAll();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single category by id' })
  @ApiOkResponse({
    description: 'The category was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new category' })
  @ApiCreatedResponse({
    description: 'The category was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(
    @Body() categoryData: CreateCategoryDto,
  ): Promise<InsertResult> {
    try {
      return await this.categoryService.create(categoryData);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Method: updates category by id' })
  @ApiOkResponse({
    description: 'Category was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() categoryData: UpdateCategoryDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    try {
      return await this.categoryService.change(categoryData, id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deletes category by id' })
  @ApiOkResponse({
    description: 'Category was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string): Promise<DeleteResult> {
    try {
      return await this.categoryService.deleteOne(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
