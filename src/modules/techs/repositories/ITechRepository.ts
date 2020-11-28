import Tech from '@modules/techs/infra/typeorm/entities/Tech';
import ITech from '../dtos/ICreateTechDTO';

export default interface ITechsRepository {
  findById(id: string): Promise<Tech | undefined>
  findAll(): Promise<Tech[]>
  create(user: ITech): Promise<Tech>
  save(user: Tech): Promise<Tech>
}
