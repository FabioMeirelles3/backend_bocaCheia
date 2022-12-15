import {
     Column,
     Entity,
     ManyToOne,
     PrimaryGeneratedColumn,
} from 'typeorm';
import { Restaurant } from './restaurant.entity';
   
@Entity('TB_Menu')
export class Menu {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     name: string;
     
     @Column()
     description: string;

     @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
     price: number;

     @Column({ nullable: true })
     arquivo: string;

     @ManyToOne(() => Restaurant, (restaurant) => Restaurant, {
          eager: true,
     })
     restaurant: Restaurant;
}
