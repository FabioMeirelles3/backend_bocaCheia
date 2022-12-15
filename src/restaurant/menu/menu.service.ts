import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { Menu } from '../entities/menu.entity';
import { CreateMenuDto } from './dto/createMenu.dto';
import { UpdateMenuDto } from './dto/updateMenu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  getMenu() {
    const menu = this.menuRepository.find();

    return menu
  }

  getMenuById(id: string): Promise<Menu> {
    const menu = this.menuRepository.findOne(Number(id));

    return menu;
  }

  getMenuByRestaurantId(id: string): Promise<Menu[]> {
    const menu = this.menuRepository.find({ where: { restaurant:Number(id) } });

    return menu;
  }
  
  async createMenu(createMenuDto: CreateMenuDto) {
    const menu = this.menuRepository.create({
      ...createMenuDto
    });
       
    const errors = await validate(menu);

    if (errors.length == 0) {
      try {
        const res = await this.menuRepository.save(menu);
        return res;
      } catch (err) {
        throw new InternalServerErrorException(err);
      }
    } else {
      throw new BadRequestException(errors);
    }
  }

  async updateMenu(id: number, updateMenuDto: UpdateMenuDto) {
 
    const menu = await this.menuRepository.preload({
      id: +id,
     ...updateMenuDto
    });

    const errors = await validate(menu);
    
    if (errors.length == 0) {
      try {        
        const res = await this.menuRepository.save(menu);
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

  async removeMenu(id: string) {
    const menu = await this.menuRepository.findOne(id);
    if (!menu) {
      throw new BadRequestException('Menu não encontrado');
    } else {
      try {
        return this.menuRepository.remove(menu);
      } catch (err) {
        throw new InternalServerErrorException(
          'Erro ao realizar o processo solicitado! Em caso de dúvidas entre em contato com o setor responsável.',
        );
      }
    }
  }
}