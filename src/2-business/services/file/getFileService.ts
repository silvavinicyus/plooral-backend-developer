import { inject, injectable } from 'inversify'
import {
  IInputGetFileDto,
  IOutputGetFileDto,
} from '@business/dtos/file/getFile'
import {
  IStorageService,
  IStorageServiceToken,
} from '@business/extServices/storage/iStorageService'
import { left, right } from '@shared/either'
import { FileErrors } from '@business/errors/file'
import { IAbstractService } from '../abstractService'

@injectable()
export class GetFileService
  implements IAbstractService<IInputGetFileDto, IOutputGetFileDto>
{
  constructor(
    @inject(IStorageServiceToken)
    private storage: IStorageService
  ) {}

  async exec(props: IInputGetFileDto): Promise<IOutputGetFileDto> {
    try {
      const file = await this.storage.getFile(props.key)

      return right(file.content)
    } catch (err) {
      console.error(err)
      return left(FileErrors.getFailed())
    }
  }
}
