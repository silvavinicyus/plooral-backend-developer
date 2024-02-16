import { inject, injectable } from 'inversify'
import { IOutputUpdateJobDto } from '@business/dtos/jobs/update'
import { FindByJobService } from '@business/services/job/findByJobService'
import { UpdateJobService } from '@business/services/job/updateJobService'
import { left } from '@shared/either'
import { AbstractUseCase } from '../abstractOperator'
import { InputUpdateJob } from '../../serializers/job/inputUpdate'

@injectable()
export class UpdateJobUseCase extends AbstractUseCase<
  InputUpdateJob,
  IOutputUpdateJobDto
> {
  constructor(
    @inject(FindByJobService)
    private findByJob: FindByJobService,
    @inject(UpdateJobService)
    private updateJob: UpdateJobService
  ) {
    super()
  }

  async run(input: InputUpdateJob): Promise<IOutputUpdateJobDto> {
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
        ...input,
      },
      {
        column: 'id',
        value: input.id,
      }
    )

    return jobResult
  }
}
