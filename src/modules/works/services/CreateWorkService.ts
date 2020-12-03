import { injectable, inject } from 'tsyringe';
import Work from '@modules/works/infra/typeorm/entities/Work';
import AppError from '@shared/errors/AppError';
import ICreateWorkDTO from '../dtos/ICreateWorkDTO';
import IWorksRepository from '../repositories/IWorksRepository';

@injectable()
export default class CreateWorkService {
  constructor(
    @inject('WorksRepository')
    private worksRepository: IWorksRepository,
  ) {}

  public async execute({
    deploy_url, title, user_id, description,
  }: ICreateWorkDTO): Promise<Work> {
    if (!user_id) {
      throw new AppError('You need to inform a user to create a work')
    }

    const work = await this.worksRepository.create({
      deploy_url,
      title,
      user_id,
      description,
    });

    return work;
  }
}
