import { injectable, inject } from 'tsyringe';
import Tech from '@modules/techs/infra/typeorm/entities/Tech';
import AppError from '@shared/errors/AppError';
import ICreateTechDTO from '../dtos/ICreateTechDTO';
import ITechsRepository from '../repositories/ITechRepository';

@injectable()
export default class CreateTechService {
  constructor(
    @inject('TechsRepository')
    private techsRepository: ITechsRepository,
  ) {}

  public async execute({
    status, title, user_id,
  }: ICreateTechDTO): Promise<Tech> {
    const findTech = await this.techsRepository.findByTitleAndUserId(title, user_id);

    if (findTech) {
      throw new AppError('User Already have this technology created you can only update it', 401)
    }

    const tech = await this.techsRepository.create({
      status,
      title,
      user_id,
    });

    return tech;
  }
}
