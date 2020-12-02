import { Request, Response } from 'express';
import * as yup from 'yup'
import CreateTechService from '@modules/techs/services/CreateTechService';
import UpdateTechService from '@modules/techs/services/UpdateTechService';
import AppError from '@shared/errors/AppError';
import { container } from 'tsyringe';
import DeleteTechService from '@modules/techs/services/DeleteTechService';

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

  public async update(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      status: yup.string().required('you can only update the status on a user tech'),
    })

    await schema.validate(request.body, { abortEarly: false }).catch(({ errors }) => {
      throw new AppError(errors)
    })

    const {
      status,
    } = request.body;

    const { id } = request.params;

    const updateTech = container.resolve(UpdateTechService);

    const techs = await updateTech.execute({
      id,
      status,
    })

    return response.status(201).json(techs)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTech = container.resolve(DeleteTechService);

    await deleteTech.execute({
      id,
    })

    return response.status(204).json()
  }
}
