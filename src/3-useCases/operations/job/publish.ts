import { FindByJobService } from '@business/services/job/findByJobService'
import { SendJobToQueueService } from '@business/services/job/sendJobToQueueService'
import { IError } from '@shared/IError'
import { Either, left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { JobStatusEnum } from '@domain/entities/job'
import { JobErrors } from '@business/errors/job'
import { InputPublishJob } from '../../serializers/job/inputPublish'
import { AbstractUseCase } from '../abstractOperator'

@injectable()
export class PublishJobUseCase extends AbstractUseCase<
  InputPublishJob,
  Either<IError, { message: string }>
> {
  constructor(
    @inject(FindByJobService)
    private findByJob: FindByJobService,
    @inject(SendJobToQueueService)
    private sendJobToQueue: SendJobToQueueService
  ) {
    super()
  }

  async run(
    input: InputPublishJob
  ): Promise<Either<IError, { message: string }>> {
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

    if (job.value.status === JobStatusEnum.PUBLISHED) {
      return left(JobErrors.alreadyPublished())
    }

    if (
      job.value.status === JobStatusEnum.ARCHIVED ||
      job.value.status === JobStatusEnum.REJECTED
    ) {
      return left(JobErrors.terminalState())
    }

    const jobQueued = await this.sendJobToQueue.exec(job.value)

    if (jobQueued.isLeft()) {
      return left(jobQueued.value)
    }

    return right({
      message:
        'This job was sent to moderation, and after being validated will be published!',
    })
  }
}
