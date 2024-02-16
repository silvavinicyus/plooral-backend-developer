import { inject, injectable } from 'inversify'
import { Either, left, right } from '@shared/either'
import { IError } from '@shared/IError'
import { FindByJobService } from '@business/services/job/findByJobService'
import { UpdateJobService } from '@business/services/job/updateJobService'
import { JobStatusEnum } from '@domain/entities/job'
import { JobErrors } from '@business/errors/job'
import { AbstractUseCase } from '../abstractOperator'
import { InputArchiveJob } from '../../serializers/job/inputArchive'

@injectable()
export class ArchiveJobUseCase extends AbstractUseCase<
  InputArchiveJob,
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

  async run(input: InputArchiveJob): Promise<Either<IError, void>> {
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

    if (job.value.status === JobStatusEnum.ARCHIVED) {
      return left(JobErrors.alreadyArchived())
    }

    const jobResult = await this.updateJob.exec(
      {
        status: JobStatusEnum.ARCHIVED,
      },
      {
        column: 'id',
        value: input.id,
      }
    )

    if (jobResult.isLeft()) {
      return left(JobErrors.archiveFailed())
    }

    return right(void 0)
  }
}
