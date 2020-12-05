import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { DeleteResult } from 'typeorm';
import IWorksRepository from '../repositories/IWorksRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteWorkService {
  constructor(
    @inject('WorksRepository')
    private worksRepository: IWorksRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void | DeleteResult> {
    const findId = await this.worksRepository.findById(id);

    if (!findId) {
      throw new AppError('Not found tech with this id', 404)
    }

    return this.worksRepository.delete(id)
  }
}
