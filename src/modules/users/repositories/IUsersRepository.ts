import User from '@modules/users/infra/typeorm/entities/User';
import IPagination from '@shared/dtos/IPagination';
import IUser from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  create(user: IUser): Promise<User>
  save(user: User): Promise<User>
  findAll(pagination: IPagination): Promise<User[]>
}
