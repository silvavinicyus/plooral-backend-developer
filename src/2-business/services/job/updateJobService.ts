import { inject, injectable } from 'inversify'
import {
  IInputUpdateJobDto,
  IOutputUpdateJobDto,
} from '@business/dtos/jobs/update'
import {
  IJobRepository,
  IJobRepositoryToken,
  updateWhereJob,
} from '@business/repositories/job/job'
import { ITransaction } from '@business/dtos/transaction/create'
import { left, right } from '@shared/either'
import { JobErrors } from '@business/errors/job'
import { JobEntity } from '@domain/entities/job'
import { IAbstractService } from '../abstractService'

@injectable()
export class UpdateJobService
  implements IAbstractService<IInputUpdateJobDto, IOutputUpdateJobDto>
{
  constructor(
    @inject(IJobRepositoryToken)
    private jobRepository: IJobRepository
  ) {}

  async exec(
    props: IInputUpdateJobDto,
    updateWhere: updateWhereJob,
    trx?: ITransaction
  ): Promise<IOutputUpdateJobDto> {
    try {
      const jobEntity = JobEntity.update(props)

      const jobResult = await this.jobRepository.update(
        {
          newData: jobEntity.value.export(),
          updateWhere,
        },
        trx
      )

      return right(jobResult)
    } catch (err) {
      console.error(err)
      return left(JobErrors.updateFailed())
    }
  }
}
