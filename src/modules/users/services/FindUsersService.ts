import { inject, injectable } from 'tsyringe'
import IPagination from '@shared/dtos/IPagination';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

@injectable()
export default class FindUsersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ skip, take }: IPagination): Promise<User[]> {
    const users = await this.userRepository.findAll({ skip, take });

    return users;
  }
}
