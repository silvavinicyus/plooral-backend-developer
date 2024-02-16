import { IOutputDeleteJobDto } from '@business/dtos/jobs/delete'
import { DeleteJobService } from '@business/services/job/deleteJobService'
import { FindByJobService } from '@business/services/job/findByJobService'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { InputDeleteJob } from '../../serializers/job/inputDelete'
import { AbstractUseCase } from '../abstractOperator'

@injectable()
export class DeleteJobUseCase extends AbstractUseCase<
  InputDeleteJob,
  IOutputDeleteJobDto
> {
  constructor(
    @inject(FindByJobService)
    private findByJob: FindByJobService,
    @inject(DeleteJobService)
    private deleteJob: DeleteJobService
  ) {
    super()
  }

  async run(input: InputDeleteJob): Promise<IOutputDeleteJobDto> {
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

    const jobResult = await this.deleteJob.exec({ id: input.id })

    return jobResult
  }
}
