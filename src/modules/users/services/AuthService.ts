import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  email: string;
  password: string;
}

// interface IResponse {
//   user: User;
// }

class AuthService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Combinação de email e senha incorretos.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Combinação de email e senha incorretos.', 401);
    }

    await usersRepository.save(user);

    return user;
  }
}

export default AuthService;
