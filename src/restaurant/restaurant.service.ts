import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { UpdateRestaurantDto } from './dto/updateRestaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  getRestaurant() {
    const restaurant = this.restaurantRepository.find();

    return restaurant
  }

  getRestaurantById(id: string): Promise<Restaurant> {
    const restaurant = this.restaurantRepository.findOne(Number(id));

    return restaurant;
  }
  
  async createRestaurant(createRestaurantDto: CreateRestaurantDto) {
    const restaurant = this.restaurantRepository.create({
      ...createRestaurantDto
    });
       
    const errors = await validate(restaurant);

    if (errors.length == 0) {
      try {
        const res = await this.restaurantRepository.save(restaurant);
        return res;
      } catch (err) {
        throw new InternalServerErrorException(err);
      }
    } else {
      throw new BadRequestException(errors);
    }
  }

  async updateRestaurant(id: number, updateRestaurantDto: UpdateRestaurantDto) {
 
    const restaurant = await this.restaurantRepository.preload({
      id: +id,
     ...updateRestaurantDto
    });

    const errors = await validate(restaurant);
    
    if (errors.length == 0) {
      try {        
        const res = await this.restaurantRepository.save(restaurant);
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

  async removeRestaurant(id: string) {
    const restaurant = await this.restaurantRepository.findOne(id);
    if (!restaurant) {
      throw new BadRequestException('Restaurante não encontrado');
    } else {
      try {
        return this.restaurantRepository.remove(restaurant);
      } catch (err) {
        throw new InternalServerErrorException(
          'Erro ao realizar o processo solicitado! Em caso de dúvidas entre em contato com o setor responsável.',
        );
      }
    }
  }
}