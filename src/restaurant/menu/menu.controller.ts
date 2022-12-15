import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/createMenu.dto';
import { UpdateMenuDto } from './dto/updateMenu.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';

@Controller('menu')
@UseGuards(AuthGuard('jwt'))
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('all')
  getMenu() {
    return this.menuService.getMenu();
  }

  @Get(':id')
  getMenuById(@Param('id') id: string) {
    return this.menuService.getMenuById(id);
  }

  @Get('rest/:id')
  getMenuByRestaurantId(@Param('id') id: string) {
    return this.menuService.getMenuByRestaurantId(id);
  }

  @Post('salvar')
  createMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.createMenu(createMenuDto);
  }

  @Patch(':id')
  updateMenu(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.updateMenu(+id, updateMenuDto);
  }

  @Delete(':id')
  removeMenu(@Param('id') id: string) {
    return this.menuService.removeMenu(id);
  }
}