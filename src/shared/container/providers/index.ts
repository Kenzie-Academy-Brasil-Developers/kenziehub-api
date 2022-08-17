import { container } from 'tsyringe';
import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from './StorageProvider/implementations/S3StorageProvider';

interface IProviders {
  [key: string]: typeof DiskStorageProvider | typeof S3StorageProvider;
}

const providers: IProviders = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

const storage = process.env.STORAGE_DRIVER || 'disk';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[storage],
);
