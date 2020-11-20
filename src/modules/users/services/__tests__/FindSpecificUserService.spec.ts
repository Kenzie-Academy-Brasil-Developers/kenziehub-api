import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../../repositories/fakes/FakeUserRepository'
import CreateUserService from '../CreateUserService';
import FindSpecificUserService from '../FindSpecificUserService';

describe('FindSpecificUser', () => {
  it('should be able to list an specific user', async () => {
    const fakeUserRepository = new FakeUserRepository();

    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      bio: 'Lorem ipsum dolor emet',
      contact: 'linkedin/in/johndoe',
      course_module: 'Segundo módulo (Frontend Avançado)',
    })

    const findUserService = new FindSpecificUserService(fakeUserRepository);

    const findUser = await findUserService.execute({ user_id: user.id })

    expect(findUser).toHaveProperty('id')
  })

  it('should not be able to list a non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();

    const findUserService = new FindSpecificUserService(fakeUserRepository);

    expect(findUserService.execute({ user_id: '1' })).rejects.toBeInstanceOf(AppError)
  })
})
