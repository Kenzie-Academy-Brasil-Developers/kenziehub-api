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

  public async execute({ skip, take }: IPagination, tech?: string): Promise<User[]> {
    if (tech) {
      const users = await this.userRepository.findByTech({ skip, take }, tech);

      return users;
    }

    const users = await this.userRepository.findAll({ skip, take });

    return users;
  }
}
