import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
