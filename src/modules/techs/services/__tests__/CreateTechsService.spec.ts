import AppError from '@shared/errors/AppError';
import FakeTechRepository from '../../repositories/fakes/FakeTechRepository'
import CreateTechService from '../CreateTechService';

describe('CreateTech', () => {
  it('should be able to create a new tech', async () => {
    const fakeTechRepository = new FakeTechRepository();

    const createTechService = new CreateTechService(fakeTechRepository);

    const tech = await createTechService.execute({
      title: 'ReactJS',
      status: 'Aprendizado',
      user_id: 'uuid_aleatorio',
    })

    expect(tech).toHaveProperty('id')
  })

  it('should not be able to create a new tech with the same title on same user', async () => {
    const fakeTechRepository = new FakeTechRepository();

    const createTechService = new CreateTechService(fakeTechRepository);

    await createTechService.execute({
      title: 'ReactJS',
      status: 'Aprendizado',
      user_id: 'uuid_aleatorio',
    })

    expect(createTechService.execute({
      title: 'ReactJS',
      status: 'Aprendizado',
      user_id: 'uuid_aleatorio',
    })).rejects.toBeInstanceOf(AppError);
  })
})
