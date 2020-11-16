import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../../repositories/fakes/FakeUserRepository'
import AuthService from '../AuthService';
import CreateUserService from '../CreateUserService'

describe('AuthUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthService(fakeUserRepository, fakeHashProvider);
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    const auth = await authenticateUser.execute({
      email: 'john@example.com',
      password: '123456',
    })

    expect(auth).toHaveProperty('token')
    expect(auth.user).toEqual(user)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthService(fakeUserRepository, fakeHashProvider);
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

    await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    expect(authenticateUser.execute({
      email: 'john@example.com',
      password: '1234567',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with a non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthService(fakeUserRepository, fakeHashProvider);

    expect(authenticateUser.execute({
      email: 'john@example.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError)
  })
})
