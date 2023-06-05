import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../database';

import jwt from 'jsonwebtoken';
import { User } from '../../entities/User';
import { AuthSignInDTO } from '../../interfaces/authSignInDTO';
import { IUserDTO, IUserLoginDTO, IUserRepository } from '../IUserRepository';
import md5 from 'md5';

export class UserRepository implements IUserRepository {

  private static _INSTANCE: UserRepository;

  private repository: Repository<User>;

  private constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  public static getInstance(): UserRepository {
    if (!UserRepository._INSTANCE) {
      UserRepository._INSTANCE = new UserRepository();
    }
    return UserRepository._INSTANCE;
  }

  async signIn({ email, password }: IUserLoginDTO): Promise<AuthSignInDTO | false> {

    console.log(email, password, 'To no sign in');
   
    const user = await this.repository.find({
      where: {
        email: email,
        senha: md5(password),
      },
    });

    if ( !(user.length === 0) ) {

      const secret:string = String(process.env.SECRET);

      let val:AuthSignInDTO = {
        nome: user[0].nome,
        email: user[0].email,
        administador: user[0].administrador,
        auth: true,
        token: jwt.sign({ email:user[0].nome, filial:user[0].email }, secret ),
      };
  
      return val;
    } else {
      return false;
    }
    
  }

  async sendRecEmail(email: string): Promise<boolean> {
    console.log('E-mail recebido: ' + email);

    return await this.getUserByEmail(email) ? true : false;
  }

  async getUserByEmail(email: string): Promise<User | false> {

    const user = await this.repository.find({
      where: {
        email: email,
      },
    });

    if (user.length > 0) {
      return user[0];
    } else {
      return false;
    }
  }

  getAllUsers(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  createUser({ name, email, senha }: IUserDTO): Promise<User> {
    console.log(name, email, senha);
    throw new Error('Method not implemented.');
  }

}