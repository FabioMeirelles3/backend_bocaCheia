import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './createMenu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {}
