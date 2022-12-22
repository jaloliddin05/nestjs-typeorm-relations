import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
} from 'typeorm';
import { Market } from '../market/market.entity';

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
}
