import { CreateUserInputModel } from '@domain/model';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserInput implements CreateUserInputModel {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  birthdate!: string;

  @Field()
  password!: string;
}
