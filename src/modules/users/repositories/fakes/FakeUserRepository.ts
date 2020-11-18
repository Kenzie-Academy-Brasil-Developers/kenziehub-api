import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { v4 as uuid } from 'uuid';

class UsersRepository
implements IUsersRepository {
  private users: User[] = []

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.id === id)

    return findUser
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.email === email)

    return findUser
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex((findUser) => findUser.id === user.id)

    this.users[findIndex] = user;

    return user;
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(), name, email, password,
    })

    this.users.push(user)

    return user
  }
}

export default UsersRepository;
