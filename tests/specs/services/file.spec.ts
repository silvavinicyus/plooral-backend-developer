import { IInputGetFileDto } from '@business/dtos/file/getFile'
import { FileErrors } from '@business/errors/file'
import { IStorageServiceToken } from '@business/extServices/storage/iStorageService'
import { GetFileService } from '@business/services/file/getFileService'
import { container } from '@shared/ioc/container'
import {
  FakeStorageService,
  fakeStorageServiceGetFile,
} from '@tests/mocks/extServices/fakeStorageService'

describe('File Service', () => {
  beforeAll(() => {
    container
      .bind(IStorageServiceToken)
      .to(FakeStorageService)
      .inSingletonScope()
  })

  afterAll(() => {
    container.unbindAll()
  })

  describe('Get File', () => {
    const input: IInputGetFileDto = {
      key: 'key_file.json',
    }

    test('Should fail to get a file from storage if storage service failed', async () => {
      fakeStorageServiceGetFile.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(GetFileService)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(FileErrors.getFailed())
    })

    test('Should have success to get a file from storage', async () => {
      fakeStorageServiceGetFile.mockImplementationOnce(async () => ({
        type: 'application/json',
        content: Buffer.from('{"message": "Success"}'),
      }))

      const sut = container.get(GetFileService)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })
  })
})
