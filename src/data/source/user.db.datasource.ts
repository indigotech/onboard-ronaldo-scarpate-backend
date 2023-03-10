import { Database } from '@db';
import { CreateUserInputModel } from '@domain/model';
import { User } from '@entities';
import { Service } from 'typedi';
import { Repository } from 'typeorm';

@Service()
export class UserDataSource {
  private readonly userRepository: Repository<User> = Database.connection.getRepository(User);

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  saveUser(user: CreateUserInputModel & { salt: string }) {
    return this.userRepository.save({ ...user });
  }
}
