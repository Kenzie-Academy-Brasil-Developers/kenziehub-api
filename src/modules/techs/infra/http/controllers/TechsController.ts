import { Request, Response } from 'express';
import * as yup from 'yup'
import CreateTechService from '@modules/techs/services/CreateTechService';
import AppError from '@shared/errors/AppError';
import { container } from 'tsyringe';

export default class UsersControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      title: yup.string().required('name is required'),
      status: yup.string().required('email is required'),
    })

    await schema.validate(request.body, { abortEarly: false }).catch(({ errors }) => {
      throw new AppError(errors)
    })

    const {
      title, status,
    } = request.body;

    const createTech = container.resolve(CreateTechService);

    const techs = await createTech.execute({
      status,
      title,
      user_id: request.user.id,
    })

    return response.status(201).json(techs)
  }
}
