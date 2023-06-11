import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Person {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  father: string;

  @Field(() => String)
  @Prop()
  mother: string;

  @Field(() => String)
  @Prop({ unique: true })
  email: string;

  @Field(() => String)
  @Prop()
  mobile: string;
}

@ObjectType()
export class GetPersonPaginatedResponse {
  @Field(() => [Person], { nullable: false, defaultValue: [] })
  person: Person[];

  @Field(() => Int, { nullable: false, defaultValue: 0 })
  personCount: number;
}

export type PersonDocument = Person & Document;
export const PersonSchema = SchemaFactory.createForClass(Person);
