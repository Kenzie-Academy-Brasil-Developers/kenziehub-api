import { Router } from 'express';
import UserRouter from '@modules/users/infra/http/routes/users.routes'
import SessionRouter from '@modules/users/infra/http/routes/session.routes'
import techRouter from '@modules/techs/infra/http/routes/techs.routes';
import ProfileRouter from '@modules/users/infra/http/routes/profile.routes'

const routes = Router();

routes.use('/sessions', SessionRouter)
routes.use('/users', UserRouter)
routes.use('/users/techs', techRouter)
routes.use('/profile', ProfileRouter)

export default routes;
