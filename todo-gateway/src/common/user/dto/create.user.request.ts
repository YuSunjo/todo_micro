import { IsEmail, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserRequest {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @Field(() => String)
  password: string;

  @IsNotEmpty()
  @Field(() => String)
  name: string;
}
