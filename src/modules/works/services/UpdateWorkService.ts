import { injectable, inject } from 'tsyringe';
import Work from '@modules/works/infra/typeorm/entities/Work';
import AppError from '@shared/errors/AppError';
import IUpdateWorkDTO from '../dtos/IUpdateWorkDTO';
import IWorksRepository from '../repositories/IWorksRepository';

@injectable()
export default class UpdateWorkService {
  constructor(
    @inject('WorksRepository')
    private worksRepository: IWorksRepository,
  ) {}

  public async execute({
    id, deploy_url, description, title,
  }: IUpdateWorkDTO): Promise<Work> {
    const work = await this.worksRepository.findById(id);

    if (!work) {
      throw new AppError('Work not found', 404)
    }

    deploy_url ? work.deploy_url = deploy_url : work.deploy_url
    description ? work.description = description : work.description;
    title ? work.title = title : work.title;

    return this.worksRepository.save(work);
  }
}
