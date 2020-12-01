import { injectable, inject } from 'tsyringe';
import Tech from '@modules/techs/infra/typeorm/entities/Tech';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUpdateTechDTO from '../dtos/IUpdateTechDTO';
import ITechsRepository from '../repositories/ITechRepository';

@injectable()
export default class CreateTechService {
  constructor(
    @inject('TechsRepository')
    private techsRepository: ITechsRepository,
  ) {}

  public async execute({
    status,
    id,
  }: IUpdateTechDTO): Promise<Tech> {
    const tech = await this.techsRepository.findById(id);

    if (!tech) {
      throw new AppError('Tech not found', 404)
    }

    if (!status) {
      throw new AppError('You can only update the status on a user tech', 401)
    }

    tech.status = status

    return this.techsRepository.save(tech);
  }
}
