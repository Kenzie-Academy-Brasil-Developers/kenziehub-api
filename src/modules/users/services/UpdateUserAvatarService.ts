import { injectable, inject } from 'tsyringe'
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { IAvatar } from '../dtos/IUpdateAvatarDTO';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider : IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IAvatar) : Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename)

    user.avatar = filename;

    await this.userRepository.save(user);

    return user;
  }
}
