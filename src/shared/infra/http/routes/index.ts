import { Router } from 'express';
import UserRouter from '@modules/users/infra/http/routes/users.routes'
import SessionRouter from '@modules/users/infra/http/routes/session.routes'
import techRouter from '@modules/techs/infra/http/routes/techs.routes';
import ProfileRouter from '@modules/users/infra/http/routes/profile.routes'
import workRouter from '@modules/works/infra/http/routes/works';

const routes = Router();

routes.use('/sessions', SessionRouter)
routes.use('/users', UserRouter)
routes.use('/users/techs', techRouter)
routes.use('/users/works', workRouter)
routes.use('/profile', ProfileRouter)

export default routes;
