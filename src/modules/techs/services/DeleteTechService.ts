import { injectable, inject } from 'tsyringe';
import { DeleteResult } from 'typeorm';
import IUpdateTechDTO from '../dtos/IUpdateTechDTO';
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
    return this.techsRepository.delete(id)
  }
}
