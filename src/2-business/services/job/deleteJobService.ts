import { inject, injectable } from 'inversify'
import {
  IInputDeleteJobDto,
  IOutputDeleteJobDto,
} from '@business/dtos/jobs/delete'
import {
  IJobRepository,
  IJobRepositoryToken,
} from '@business/repositories/job/job'
import { ITransaction } from '@business/dtos/transaction/create'
import { left, right } from '@shared/either'
import { JobErrors } from '@business/errors/job'
import { IAbstractService } from '../abstractService'

@injectable()
export class DeleteJobService
  implements IAbstractService<IInputDeleteJobDto, IOutputDeleteJobDto>
{
  constructor(
    @inject(IJobRepositoryToken)
    private jobRepository: IJobRepository
  ) {}

  async exec(
    props: IInputDeleteJobDto,
    trx?: ITransaction
  ): Promise<IOutputDeleteJobDto> {
    try {
      await this.jobRepository.delete(props, trx)

      return right(void 0)
    } catch (err) {
      console.error(err)
      return left(JobErrors.deleteFailed())
    }
  }
}
