import { CreateUserResponseModel } from '@domain/model';
import { CreateUserUserCase } from '@domain/mutation';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { CreateUserInput } from './user.input';
import { UserType } from './user.type';

@Service()
@Resolver()
class UserResolver {
  constructor(private readonly createUserUseCase: CreateUserUserCase) {}

  @Query(() => String)
  test() {
    return "I'm working.";
  }

  @Mutation(() => UserType)
  createUser(
    @Arg('data')
    data: CreateUserInput,
  ): Promise<CreateUserResponseModel> {
    return this.createUserUseCase.exec(data);
  }
}

export const resolvers = [UserResolver] as const;
