import AuthService from '@modules/users/services/AuthService';
import * as yup from 'yup';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      email: yup.string().email('invalid email').required('email is required'),
      password: yup.string().required('password is required'),
    })

    await schema.validate(request.body, { abortEarly: false }).catch(({ errors }) => {
      throw new AppError(errors)
    })

    const { email, password } = request.body;

    const authUser = container.resolve(AuthService);

    const { user, token } = await authUser.execute({
      email, password,
    });

    return response.json(classToClass({ user, token }));
  }
}
