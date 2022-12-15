import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';

export class CreateMenuDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsString({ message: 'O nome deve ser string' })
  @MaxLength(255, { message: 'Limite máximo de caracteres para o nome é 255' })
  name: string;

  @IsNotEmpty({ message: 'A descrição não pode ser vazio' })
  @IsString({ message: 'A descrição  deve ser string' })
  @MaxLength(255, { message: 'Limite máximo de caracteres para a descrição  é 255' })
  description: string;

  @IsNotEmpty({ message: 'O preço não pode ser vazio' })
  @IsNumber({}, { message: 'O preço deve ser um numero' })
  @IsPositive({ message: 'O preço deve ser um número positivo' })
  price: number;

  @IsOptional()
  arquivo: string;

  @IsNotEmpty({ message: 'O cargo não pode ser vazio' })
  restaurant: Restaurant;
}
