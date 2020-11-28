import FakeTechRepository from '../../repositories/fakes/FakeTechRepository'
import CreateTechService from '../CreateTechService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeTechRepository = new FakeTechRepository();

    const createTechService = new CreateTechService(fakeTechRepository);

    const tech = await createTechService.execute({
      title: 'ReactJS',
      status: 'Aprendizado',
      user_id: 'uuid_aleatorio',
    })

    expect(tech).toHaveProperty('id')
  })
})
