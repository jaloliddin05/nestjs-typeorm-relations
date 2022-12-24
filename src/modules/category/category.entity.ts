import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Market } from '../market/market.entity';
import { Product } from '../product/product.entity';

@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    name: 'title',
  })
  title: string;

  @ManyToMany(() => Market, (market) => market.categories, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  markets: Market[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
