import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { UpdateRestaurantDto } from './dto/updateRestaurant.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('restaurant')
@UseGuards(AuthGuard('jwt'))
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get('all')
  getRestaurant() {
    return this.restaurantService.getRestaurant();
  }

  @Get(':id')
  getRestaurantById(@Param('id') id: string) {
    return this.restaurantService.getRestaurantById(id);
  }

  @Post('salvar')
  createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.createRestaurant(createRestaurantDto);
  }

  @Patch(':id')
  updateRestaurant(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantService.updateRestaurant(+id, updateRestaurantDto);
  }

  @Delete(':id')
  removeRestaurant(@Param('id') id: string) {
    return this.restaurantService.removeRestaurant(id);
  }
}