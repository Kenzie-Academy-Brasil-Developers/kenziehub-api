import User from '@modules/users/infra/typeorm/entities/User';

export interface IAuthUser {
  email: string;
  password: string;
}

export interface IToken {
  user: User;
  token: string;
}
