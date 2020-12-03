import CreateUserService from '@modules/users/services/CreateUserService';
import FindUsersService from '@modules/users/services/FindUsersService';
import FindSpecificUserService from '@modules/users/services/FindSpecificUserService';
import * as yup from 'yup';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import AppError from '@shared/errors/AppError';

interface IRequest {
  tech: string;
}

export default class UsersControllers {
  public async index(request: Request, response: Response): Promise<Response> {
    const { tech } = request.query as unknown as IRequest;

    if (tech) {
      const users = container.resolve(FindUsersService);

      const findUsers = await users.execute({
        skip: request.pagination.realPage,
        take: request.pagination.realTake,
      }, tech);

      return response.status(200).json(classToClass(findUsers));
    }

    const users = container.resolve(FindUsersService);

    const findUsers = await users.execute({
      skip: request.pagination.realPage,
      take: request.pagination.realTake,
    });

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
    const schema = yup.object().shape({
      name: yup.string().required('name is required'),
      email: yup.string().email('invalid email').required('email is required'),
      password: yup.string().required('password is required'),
      bio: yup.string().required('bio is required'),
      contact: yup.string().required('contact is required'),
      course_module: yup.string().required('course_module is required'),
    })

    await schema.validate(request.body, { abortEarly: false }).catch(({ errors }) => {
      throw new AppError(errors)
    })

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
