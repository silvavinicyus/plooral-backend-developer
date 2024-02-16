import { inject, injectable } from 'inversify'
import { Either, left, right } from '@shared/either'
import { IError } from '@shared/IError'
import { FindByJobService } from '@business/services/job/findByJobService'
import { UpdateJobService } from '@business/services/job/updateJobService'
import { JobStatusEnum } from '@domain/entities/job'
import { JobErrors } from '@business/errors/job'
import { AbstractUseCase } from '../abstractOperator'
import { InputPublishJob } from '../../serializers/job/inputPublish'

@injectable()
export class PublishJobUseCase extends AbstractUseCase<
  InputPublishJob,
  Either<IError, void>
> {
  constructor(
    @inject(FindByJobService)
    private findByJob: FindByJobService,
    @inject(UpdateJobService)
    private updateJob: UpdateJobService
  ) {
    super()
  }

  async run(input: InputPublishJob): Promise<Either<IError, void>> {
    this.exec(input)

    const job = await this.findByJob.exec({
      where: [
        {
          column: 'id',
          value: input.id,
        },
      ],
    })

    if (job.isLeft()) {
      return left(job.value)
    }

    const jobResult = await this.updateJob.exec(
      {
        status: JobStatusEnum.PUBLISHED,
      },
      {
        column: 'id',
        value: input.id,
      }
    )

    if (jobResult.isLeft()) {
      return left(JobErrors.publishFailed())
    }

    return right(void 0)
  }
}
