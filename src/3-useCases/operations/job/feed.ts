import { GetFileService } from '@business/services/file/getFileService'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import {
  IFeedDto,
  IOutputGetFeedJobsDto,
} from '../../serializers/job/inputFeed'
import { AbstractUseCase } from '../abstractOperator'

@injectable()
export class GetFeedJobsUseCase extends AbstractUseCase<
  void,
  IOutputGetFeedJobsDto
> {
  constructor(
    @inject(GetFileService)
    private getFile: GetFileService
  ) {
    super()
  }

  async run(): Promise<IOutputGetFeedJobsDto> {
    const file = await this.getFile.exec({ key: 'jobs.json' })

    if (file.isLeft()) {
      return left(file.value)
    }

    const fileObj = JSON.parse(file.value.toString()) as IFeedDto

    return right(fileObj)
  }
}
