import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { DeleteResult } from 'typeorm';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteWorkService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void | DeleteResult> {
    const findId = await this.usersRepository.findById(id);

    if (!findId) {
      throw new AppError('Not found any user with this id', 404)
    }

    return this.usersRepository.delete(id)
  }
}
