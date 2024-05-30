import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  async findAll(page: number = 1, perPage: number = 10): Promise<{ products: Product[] }> {
    const skip = (page - 1) * perPage;
    const [products] = await this.productRepository.findAndCount({
      take: perPage,
      skip: skip,
    });
    return { products };
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: number, productData: Partial<Product>): Promise<Product> {
    const product = await this.findById(id);
    return this.productRepository.save({ ...product, ...productData });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
