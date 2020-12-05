import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { DeleteResult } from 'typeorm';
import ITechsRepository from '../repositories/ITechRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteTechService {
  constructor(
    @inject('TechsRepository')
    private techsRepository: ITechsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void | DeleteResult> {
    const findId = await this.techsRepository.findById(id);

    if (!findId) {
      throw new AppError('Not found tech with this id', 404)
    }

    return this.techsRepository.delete(id)
  }
}
