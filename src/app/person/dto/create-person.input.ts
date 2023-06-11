import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  MinLength,
} from 'class-validator';

@InputType()
export class CreatePersonInput {
  @Field(() => String)
  @MinLength(3)
  name: string;

  @Field(() => String)
  @MinLength(3)
  father: string;

  @Field(() => String)
  @MinLength(3)
  mother: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  mobile: string;
}
