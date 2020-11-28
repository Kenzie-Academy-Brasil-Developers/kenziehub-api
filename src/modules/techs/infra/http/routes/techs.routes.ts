import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import { Router } from 'express';

const techRouter = Router();

techRouter.use(ensureAuth);

techRouter.post('/', () => {});

export default techRouter;
