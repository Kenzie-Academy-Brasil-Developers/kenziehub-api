import ICreateWorkDTO from '@modules/works/dtos/ICreateWorkDTO';
import Work from '@modules/works/infra/typeorm/entities/Work';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import IWorksRepository from '../../../repositories/IWorksRepository';

export default class WorksRepository implements IWorksRepository {
  private ormRepository: Repository<Work>;

  constructor() {
    this.ormRepository = getRepository(Work)
  }

  public async findById(id: string): Promise<Work | undefined> {
    try {
      const findWork = await this.ormRepository.findOne(id);

      return findWork;
    } catch (err) {
      return undefined
    }
  }

  public async findAll(): Promise<Work[]> {
    const works = await this.ormRepository.find();

    return works
  }

  public async create({
    title, deploy_url, description, user_id,
  }: ICreateWorkDTO): Promise<Work> {
    const work = this.ormRepository.create({
      title,
      deploy_url,
      description,
      user: {
        id: user_id,
      },
    })

    await this.ormRepository.save(work)

    return work
  }

  public async save(work: Work): Promise<Work> {
    const newWork = await this.ormRepository.save(work);

    return newWork;
  }

  public async delete(id: string): Promise<void | DeleteResult> {
    return this.ormRepository.delete(id);
  }
}
