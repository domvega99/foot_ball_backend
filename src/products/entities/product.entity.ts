import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  description: string;

  @Column()
  slug: string;

  @Column()
  product_code: string;

  @Column()
  product_group: string;

  @Column('json', { nullable: true })
  sizes: { id: number, size_name: string }[];

  @Column('json', { nullable: true })
  colors: { id: number, color_name: string }[];

  @Column('json', { nullable: true })
  varieties: { id: number, variety_name: string }[];

  @Column('json', { nullable: true })
  delivery_type: { id: number, delivery_type_name: string }[];

  @Column({ type: 'double' })
  retail_price: number;

  @Column({ type: 'double' })
  retail_discount_price: number;

  @Column({ type: 'double' })
  product_price: number;

  @Column('json', { nullable: true })
  cross_sell: { cross_sell_id: number }[];

  @Column('json', { nullable: true })
  photos: { id: number, file_name: string, path_name: string }[];
}
