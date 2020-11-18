import CreateUserService from '@modules/users/services/CreateUserService';
import FindUsersService from '@modules/users/services/FindUsersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersControllers {
  public async index(request: Request, response: Response): Promise<Response> {
    const users = container.resolve(FindUsersService);

    const findUsers = await users.execute();

    return response.json(findUsers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }
}
