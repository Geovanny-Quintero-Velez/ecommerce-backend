import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../role/role.enum';

export class CreateUserDto {
    @IsUUID()
    @IsOptional()
    userid?: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    lastname: string;
  
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    birthdate?: Date;
  
    @IsString()
    @IsNotEmpty()
    @Length(8, 255)
    password: string;
  
    @IsString()
    @IsOptional()
    role: string;
  
    @IsString()
    @IsOptional()
    username?: string;
  
    @Type(() => Date)
    @IsOptional()
    createdat?: Date;
  
    @Type(() => Date)
    @IsOptional()
    deletedat?: Date;
}
