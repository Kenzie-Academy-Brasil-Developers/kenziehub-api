import AuthService from '@modules/users/services/AuthService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authUser = container.resolve(AuthService);

    const { user, token } = await authUser.execute({
      email, password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}
