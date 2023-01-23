import { HashService } from '@core/crypto';
import { birthValidator, passValidator } from '@core/validators';
import { UserDataSource } from '@db/source';
import { CreateUserInputModel, CreateUserResponseModel } from '@domain/model';
import { Service } from 'typedi';

@Service()
export class CreateUserUserCase {
  private readonly salt = this.hashService.genSalt();

  constructor(private readonly repository: UserDataSource, private readonly hashService: HashService) {}

  async exec(input: CreateUserInputModel): Promise<CreateUserResponseModel> {
    const { name, email, birthdate, password } = input;
    const user = await this.repository.findOneByEmail(email);
    const birthFormated = new Date(birthdate);

    if (user) {
      throw new Error(`Usuário com e-mail '${email}' já possui cadastro.`);
    }
    if (!birthFormated.getTime()) {
      throw new Error(`A data de nascimento '${birthdate}' não é válida.`);
    }

    if (!birthValidator(birthdate)) {
      throw new Error(`Para se cadastrar é necessário ter no mínimo 15 (quinze) anos.`);
    }

    if (!passValidator(password)) {
      throw new Error(`A senha informada não é válida.`);
    }

    const hashedPass = this.hashService.genPassSalted(password, this.salt);

    return this.repository.saveUser({
      name,
      birthdate: birthFormated.toJSON(),
      email,
      password: hashedPass,
      salt: this.salt
    });
  }
}
