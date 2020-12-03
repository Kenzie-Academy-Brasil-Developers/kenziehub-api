import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import { Router } from 'express';
import WorksController from '../controllers/WorksController'

const workRouter = Router();

const worksController = new WorksController();

workRouter.use(ensureAuth);

workRouter.post('/', worksController.create);

workRouter.put('/:id', worksController.update);

workRouter.delete('/:id', worksController.delete)

export default workRouter;
