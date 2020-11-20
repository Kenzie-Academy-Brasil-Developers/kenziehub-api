import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../../repositories/fakes/FakeUserRepository'
import CreateUserService from '../CreateUserService';
import FindUsersService from '../FindUsersService';

describe('FindUsers', () => {
  it('should be able to list users', async () => {
    const fakeUserRepository = new FakeUserRepository();

    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

    await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      bio: 'Lorem ipsum dolor emet',
      contact: 'linkedin/in/johndoe',
      course_module: 'Segundo módulo (Frontend Avançado)',
    })

    const findUserService = new FindUsersService(fakeUserRepository);

    const user = await findUserService.execute()

    expect(user).toBeTruthy()
  })
})
