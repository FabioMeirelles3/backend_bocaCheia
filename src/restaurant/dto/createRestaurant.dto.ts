import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateRestaurantDto {
  @IsNotEmpty({ message: 'A descrição não poderá ser vazio' })
  @IsString({ message: 'A descrição deve ser string' })
  @Length(1, 255, {message:'Limite máximo de caracteres para a descrição deve ser entre 1 e 255', })
  description: string;

  @IsNotEmpty({ message: 'O nome não poderá ser vazio' })
  @IsString({ message: 'O nome deve ser string' })
  @Length(1, 255, {message:'Limite máximo de caracteres para o nome deve ser entre 1 e 255', })
  name: string;

  @IsNotEmpty({ message: 'O telefone não poderá ser vazio' })
  @IsString({ message: 'O telefone precisa ser uma string' })
  @MaxLength(20, {message: 'Limite máximo de caracteres para o telefone é 20',})
  phone: string;

  @IsNotEmpty({ message: 'O endereço não poderá ser vazio' })
  @IsString({ message: 'O endereço deve ser string' })
  @Length(1, 255, {message:'Limite máximo de caracteres para o endereço deve ser entre 1 e 255', })
  address: string;

  @IsNotEmpty({ message: 'O numero não poderá ser vazio' })
  @IsNumber({}, { message: 'O numero deve ser um numero' })
  @IsPositive({ message: 'O numero não pode ser negativo' })
  number: number;

  @IsOptional()
  complement: string;

  @IsNotEmpty({ message: 'O bairro não poderá ser vazio' })
  @IsString({ message: 'O bairro deve ser string' })
  @Length(1, 255, {message:'Limite máximo de caracteres para o bairro deve ser entre 1 e 255', })
  district: string;

  @IsOptional()
  arquivo: string;
}
