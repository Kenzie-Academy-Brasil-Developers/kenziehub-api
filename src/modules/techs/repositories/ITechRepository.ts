import Tech from '@modules/techs/infra/typeorm/entities/Tech';
import { DeleteResult } from 'typeorm';
import ITech from '../dtos/ICreateTechDTO';

export default interface ITechsRepository {
  findById(id: string): Promise<Tech | undefined>
  findByTitleAndUserId(title: string, user_id: string): Promise<Tech | undefined>
  findAll(): Promise<Tech[]>
  create(tech: ITech): Promise<Tech>
  save(tech: Tech): Promise<Tech>
  delete(id: string): Promise<void | DeleteResult>;
}
