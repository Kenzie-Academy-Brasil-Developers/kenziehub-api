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
    return this.worksRepository.delete(id)
  }
}
