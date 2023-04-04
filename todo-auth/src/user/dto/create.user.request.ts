import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserRequest {
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
  @Field(() => String)
  name: string;
}
