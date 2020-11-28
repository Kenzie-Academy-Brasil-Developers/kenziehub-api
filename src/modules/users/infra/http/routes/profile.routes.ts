import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';
import ensureAuth from '../middlewares/ensureAuth';

const profileRouter = Router();
const profileController = new ProfileController()

profileRouter.use(ensureAuth);

profileRouter.get('/', profileController.show)

profileRouter.put('/', profileController.update)

export default profileRouter;
