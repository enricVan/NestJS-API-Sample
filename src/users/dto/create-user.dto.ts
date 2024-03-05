import { IsEmail, IsEnum, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    message: 'Role must be one of the following: INTERN, ENGINEER, ADMIN',
  })
  @IsNotEmpty()
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
