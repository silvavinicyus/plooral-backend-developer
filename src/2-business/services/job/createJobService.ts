import { inject, injectable } from 'inversify'
import {
  IInputCreateJobDto,
  IOutputCreateJobDto,
} from '@business/dtos/jobs/create'
import { IInputJobEntity, JobEntity } from '@domain/entities/job'
import {
  IJobRepository,
  IJobRepositoryToken,
} from '@business/repositories/job/job'
import { ITransaction } from '@business/dtos/transaction/create'
import { left, right } from '@shared/either'
import { JobErrors } from '@business/errors/job'
import { IAbstractService } from '../abstractService'

@injectable()
export class CreateJobService
  implements IAbstractService<IInputCreateJobDto, IOutputCreateJobDto>
{
  constructor(
    @inject(IJobRepositoryToken)
    private jobRepository: IJobRepository
  ) {}

  async exec(
    props: IInputJobEntity,
    trx?: ITransaction
  ): Promise<IOutputCreateJobDto> {
    try {
      const jobEntity = JobEntity.create(props)

      const jobResult = await this.jobRepository.create(
        jobEntity.value.export(),
        trx
      )

      return right(jobResult)
    } catch (err) {
      console.error(err)
      return left(JobErrors.createFailed())
    }
  }
}
