import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productsService.create(productData);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ): Promise<{ products: Product[] }> {
    return this.productsService.findAll(page, perPage);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product> {
    return this.productsService.findById(parseInt(id, 10));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() productData: Partial<Product>,
  ): Promise<Product> {
    return this.productsService.update(parseInt(id, 10), productData);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
