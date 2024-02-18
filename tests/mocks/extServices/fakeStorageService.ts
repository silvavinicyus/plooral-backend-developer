import {
  IFile,
  IFileBuffer,
  IStorageService,
} from '@business/extServices/storage/iStorageService'
import { injectable } from 'inversify'

@injectable()
export class FakeStorageService implements IStorageService {
  async getFile(_key: string): Promise<IFileBuffer> {
    return void 0
  }

  async saveFile(_file: IFile, _key: string): Promise<void> {
    return void 0
  }
}

export const fakeStorageServiceGetFile = jest.spyOn(
  FakeStorageService.prototype,
  'getFile'
)

export const fakeStorageServiceSaveFile = jest.spyOn(
  FakeStorageService.prototype,
  'saveFile'
)
