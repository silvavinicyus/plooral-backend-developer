import { inject, injectable } from 'inversify'
import { IOutputCreateJobDto } from '@business/dtos/jobs/create'
import { CreateJobService } from '@business/services/job/createJobService'
import { FindByCompanyService } from '@business/services/company/findByCompany'
import { left } from '@shared/either'
import { JobStatusEnum } from '@domain/entities/job'
import { AbstractUseCase } from '../abstractOperator'
import { InputCreateJob } from '../../serializers/job/inputCreate'

@injectable()
export class CreateJobUseCase extends AbstractUseCase<
  InputCreateJob,
  IOutputCreateJobDto
> {
  constructor(
    @inject(CreateJobService)
    private createJob: CreateJobService,
    @inject(FindByCompanyService)
    private findByCompany: FindByCompanyService
  ) {
    super()
  }
  async run(input: InputCreateJob): Promise<IOutputCreateJobDto> {
    this.exec(input)

    const company = await this.findByCompany.exec({
      where: [
        {
          column: 'id',
          value: input.company_id,
        },
      ],
    })

    if (company.isLeft()) {
      return left(company.value)
    }

    const job = await this.createJob.exec({
      ...input,
      status: JobStatusEnum.DRAFT,
    })

    return job
  }
}
