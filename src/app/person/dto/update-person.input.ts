import { Schema as MongooSchema } from 'mongoose';
import { CreatePersonInput } from './create-person.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdatePersonInput extends PartialType(CreatePersonInput) {
  @Field(() => String)
  @IsString()
  _id: MongooSchema.Types.ObjectId;
}
