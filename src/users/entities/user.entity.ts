import { hashSync } from 'bcrypt';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('TB_Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  arquivo: string;

  @Column()
  login: string;

  @Column()
  password: string; 

  private tempPassword: string;
  @AfterLoad()
  loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    if (this.tempPassword !== this.password) {
      this.password = hashSync(this.password, 10);
    }
  }
}
