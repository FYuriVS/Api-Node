import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
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

    const token = sign({}, '1e4b25c00c673b26bbd282709cfd6d9f', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthService;
