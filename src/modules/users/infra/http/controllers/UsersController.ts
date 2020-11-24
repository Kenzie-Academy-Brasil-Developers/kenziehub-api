import CreateUserService from '@modules/users/services/CreateUserService';
import FindUsersService from '@modules/users/services/FindUsersService';
import FindSpecificUserService from '@modules/users/services/FindSpecificUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class UsersControllers {
  public async index(request: Request, response: Response): Promise<Response> {
    const users = container.resolve(FindUsersService);

    const findUsers = await users.execute();

    return response.status(200).json(classToClass(findUsers));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user = container.resolve(FindSpecificUserService)

    const findUser = await user.execute({
      user_id: id,
    });

    return response.status(200).json(classToClass(findUser))
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name, email, password, bio, contact, course_module,
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      bio,
      contact,
      course_module,
    });

    return response.status(201).json(classToClass(user));
  }
}
