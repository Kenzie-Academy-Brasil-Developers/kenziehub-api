import { Request, Response } from 'express';
import * as yup from 'yup'
import CreateWorkService from '@modules/works/services/CreateWorkService';
import AppError from '@shared/errors/AppError';
import { container } from 'tsyringe';
import UpdateWorkService from '@modules/works/services/UpdateWorkService';
import DeleteWorkService from '@modules/works/services/DeleteWorkService';

export default class WorksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const schema = yup.object().shape({
      title: yup.string().required('title is required'),
      description: yup.string().required('description is required'),
      deploy_url: yup.string().required('deploy_url is required'),
    })

    await schema.validate(request.body, { abortEarly: false }).catch(({ errors }) => {
      throw new AppError(errors)
    })

    const {
      title, description, deploy_url,
    } = request.body;

    const createTech = container.resolve(CreateWorkService);

    const works = await createTech.execute({
      title,
      description,
      deploy_url,
      user_id: request.user.id,
    })

    return response.status(201).json(works)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      title, description, deploy_url,
    } = request.body;

    const { id } = request.params;

    const updateWork = container.resolve(UpdateWorkService);

    const works = await updateWork.execute({
      id,
      title,
      description,
      deploy_url,
    })

    return response.status(201).json(works)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteWork = container.resolve(DeleteWorkService);

    await deleteWork.execute({
      id,
    })

    return response.status(204).json()
  }
}
