import uploadConfig from '@config/upload';
import { Router } from 'express';
import multer from 'multer';
import UserAvatarController from '../controllers/userAvatarController';
import UsersControllers from '../controllers/UsersController';
import ensureAuth from '../middlewares/ensureAuth';

const userRouter = Router();
const upload = multer(uploadConfig)
const userController = new UsersControllers();
const userAvatarController = new UserAvatarController();

userRouter.post('/', userController.create);

userRouter.get('/', userController.index);

userRouter.get('/:id', userController.show);

userRouter.use(ensureAuth);

userRouter.patch(
  '/avatar', upload.single('avatar'), userAvatarController.update,
);

export default userRouter;
