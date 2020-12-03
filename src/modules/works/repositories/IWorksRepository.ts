import Work from '@modules/works/infra/typeorm/entities/Work';
import { DeleteResult } from 'typeorm';
import IWork from '../dtos/ICreateWorkDTO';

export default interface IWorkRepository {
  findById(id: string): Promise<Work | undefined>
  findAll(): Promise<Work[]>
  create(work: IWork): Promise<Work>
  save(work: Work): Promise<Work>
  delete(id: string): Promise<void | DeleteResult>;
}
