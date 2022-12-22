import {
  Column,
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from '../category/category.entity';

@Entity({ name: 'market' })
export class Market extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  address: string;

  @ManyToMany(() => Category, (category) => category.markets, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  categories: Category[];
}
