import ICreateTechDTO from '@modules/techs/dtos/ICreateTechDTO';
import Tech from '@modules/techs/infra/typeorm/entities/Tech';
import { v4 as uuid } from 'uuid';
import ITechsRepository from '../ITechRepository';

export default class FakeTechsRepository implements ITechsRepository {
  private techs: Tech[] = []

  public async delete(id: string): Promise<void> {
    const findIndex = this.techs.findIndex((findTech) => findTech.id === id)

    this.techs.splice(findIndex, 1);
  }

  public async findAll(): Promise<Tech[]> {
    return this.techs;
  }

  public async findByTitleAndUserId(title: string, user_id: string): Promise<Tech | undefined> {
    const findTech = this.techs.find((tech) => tech.user.id === user_id)

    return findTech
  }

  public async findById(id: string): Promise<Tech | undefined> {
    const findTech = this.techs.find((tech) => tech.id === id)

    return findTech
  }

  public async create({ title, status, user_id }: ICreateTechDTO): Promise<Tech> {
    const tech = new Tech();

    Object.assign(tech, {
      id: uuid(),
      title,
      status,
      user: {
        id: user_id,
      },
    })

    this.techs.push(tech)

    return tech
  }

  public async save(tech: Tech): Promise<Tech> {
    const findIndex = this.techs.findIndex((findTech) => findTech.id === tech.id)

    this.techs[findIndex] = tech;

    return tech;
  }
}
