import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('TB_Restaurant')
export class Restaurant {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     name: string;

     @Column()
     description: string

     @Column({ length: 20 })
     phone: string;

     @Column({ length: 255 })
     address: string;
   
     @Column()
     number: number;
   
     @Column()
     complement: string;
   
     @Column()
     district: string;

     @Column({ nullable: true })
     arquivo: string;
}
