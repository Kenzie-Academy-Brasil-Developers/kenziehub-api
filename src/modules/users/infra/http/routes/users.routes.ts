import uploadConfig from '@config/upload';
import usePagination from '@shared/infra/http/middlewares/usePagination';
import { Router } from 'express';
import multer from 'multer';
import ProfileController from '../controllers/ProfileController';
import UserAvatarController from '../controllers/userAvatarController';
import UsersControllers from '../controllers/UsersController';
import ensureAuth from '../middlewares/ensureAuth';

const userRouter = Router();
const upload = multer(uploadConfig.multer)
const userController = new UsersControllers();
const userAvatarController = new UserAvatarController();
const profileController = new ProfileController()

userRouter.post('/', userController.create);

userRouter.get('/', usePagination, userController.index);

userRouter.get('/:id', userController.show);

userRouter.use(ensureAuth);

userRouter.patch(
  '/avatar', upload.single('avatar'), userAvatarController.update,
);

userRouter.get('/profile', profileController.show)

export default userRouter;
