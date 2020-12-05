import ICreateTechDTO from '@modules/techs/dtos/ICreateTechDTO';
import Tech from '@modules/techs/infra/typeorm/entities/Tech';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import ITechsRepository from '../../../repositories/ITechRepository';

export default class TechsRepository implements ITechsRepository {
  private ormRepository: Repository<Tech>;

  constructor() {
    this.ormRepository = getRepository(Tech)
  }

  public async findByTitleAndUserId(title: string, user_id: string): Promise<Tech | undefined> {
    const tech = await this.ormRepository.findOne({
      where: {
        title,
        user: {
          id: user_id,
        },
      },
    })

    return tech
  }

  public async findAll(): Promise<Tech[]> {
    const techs = await this.ormRepository.find();

    return techs
  }

  public async findById(id: string): Promise<Tech | undefined> {
    try {
      const findTech = await this.ormRepository.findOne(id);

      return findTech;
    } catch (e) {
      return undefined
    }
  }

  public async create({ title, status, user_id }: ICreateTechDTO): Promise<Tech> {
    const tech = this.ormRepository.create({
      title,
      status,
      user: {
        id: user_id,
      },
    })

    await this.ormRepository.save(tech)

    return tech
  }

  public async save(tech: Tech): Promise<Tech> {
    const newTech = await this.ormRepository.save(tech);

    return newTech;
  }

  public async delete(id: string): Promise<void | DeleteResult> {
    return this.ormRepository.delete(id);
  }
}
