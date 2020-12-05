import {
  getRepository, Repository,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IPagination from '@shared/dtos/IPagination';

class UsersRepository
implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async findByTech({ skip, take }: IPagination, tech: string): Promise<User[]> {
    const query = await this.ormRepository
      .createQueryBuilder('user')
      .limit(take)
      .offset(skip)
      .leftJoinAndSelect('user.techs', 'techs')
      .leftJoinAndSelect('user.works', 'works')
      .where('techs.title like :tech', { tech: `%${tech}%` })
      .getMany()

    return query;
  }

  public async findAll({ skip, take }: IPagination): Promise<User[]> {
    const users = await this.ormRepository.find({ skip, take });

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    try {
      const findUser = await this.ormRepository.findOne({
        where: {
          id,
        },
      });

      return findUser;
    } catch (err) {
      return undefined
    }
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return findUser;
  }

  public async save(user: User): Promise<User> {
    const saveUser = await this.ormRepository.save(user)
    return saveUser;
  }

  public async create({
    name, email, password, bio, contact, course_module,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      bio,
      contact,
      course_module,
    })

    await this.ormRepository.save(user);

    return user;
  }
}

export default UsersRepository;
