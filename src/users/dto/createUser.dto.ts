import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsString({ message: 'O nome deve ser string' })
  @MaxLength(255, { message: 'Limite máximo de caracteres para o nome é 255' })
  name: string;

  @IsOptional()
  @IsEmail({ message: 'O E-mail deve ter o formato de e-mail' })
  email: string;

  @IsNotEmpty({ message: 'O Login não pode ser vazio' })
  @IsString({ message: 'O Login precisa ser uma string' })
  @Length(5, 50, { message: 'O Login deve ter entre 5 e 50' })
  login: string;

  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  @IsString({ message: 'A Senha precisa ser uma string' })
  @Length(7, 16, { message: 'A senha deve ter entre 7 e 16 caracteres' })
  password: string;

  @IsOptional()
  arquivo: string;
}
