import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  getUsers() {
    const user = this.usersRepository.find();

    return user
  }

  getUserById(id: string): Promise<User> {
    const user = this.usersRepository.findOne(Number(id));

    return user;
  }
  
  async createUser(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create({
      ...createUserDto
    });
       
    const errors = await validate(user);

    if (errors.length == 0) {
      try {
        const res = await this.usersRepository.save(user);
        return res;
      } catch (err) {
        throw new InternalServerErrorException(err);
      }
    } else {
      throw new BadRequestException(errors);
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
 
    const user = await this.usersRepository.preload({
      id: +id,
     ...updateUserDto
    });

    const errors = await validate(user);
    
    if (errors.length == 0) {
      try {        
        const res = await this.usersRepository.save(user);
        return res;
      } catch (err) {
        throw new InternalServerErrorException(
          'Erro ao realizar o processo solicitado! Em caso de dúvidas entre em contato com o setor responsável.',
        );
      }
    } else {
      throw new BadRequestException(errors);
    }
  }

  async removeUser(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    } else {
      try {
        return this.usersRepository.remove(user);
      } catch (err) {
        throw new InternalServerErrorException(
          'Erro ao realizar o processo solicitado! Em caso de dúvidas entre em contato com o setor responsável.',
        );
      }
    }
  }
}
