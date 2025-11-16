import {
  IsString,
  IsEmail,
  IsEnum,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  CLIENT = 'client',
  MERCHANT = 'merchant',
}

export class CreateUserDto {
  @IsString()
  @MaxLength(255)
  @ApiProperty({ example: 'João Silva' })
  name: string;

  @IsDateString(
    {},
    { message: 'dateOfBirth must be a valid date (YYYY-MM-DD)' },
  )
  @ApiProperty({
    example: '1998-10-15',
    description: 'Data de nascimento no formato YYYY-MM-DD',
  })
  dateOfBirth: string;

  @IsEmail()
  @ApiProperty({ example: 'joao@email.com' })
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ example: '12345678', minLength: 8 })
  password: string;

  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be in E.164 format (e.g. +5511999999999)',
  })
  @ApiProperty({ example: '+5511999999999', description: 'Formato E.164' })
  phone: string;

  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;
}
