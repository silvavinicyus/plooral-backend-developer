import { inject, injectable } from 'inversify'
import {
  IInputFindByJobDto,
  IOutputFindByJobDto,
} from '@business/dtos/jobs/findBy'
import {
  IJobRepository,
  IJobRepositoryToken,
} from '@business/repositories/job/job'
import { left, right } from '@shared/either'
import { JobErrors } from '@business/errors/job'
import { IAbstractService } from '../abstractService'

@injectable()
export class FindByJobService
  implements IAbstractService<IInputFindByJobDto, IOutputFindByJobDto>
{
  constructor(
    @inject(IJobRepositoryToken)
    private jobRepository: IJobRepository
  ) {}

  async exec(props: IInputFindByJobDto): Promise<IOutputFindByJobDto> {
    try {
      const job = await this.jobRepository.findBy(props)

      if (!job) {
        console.error('Error: not found')
        return left(JobErrors.notFound())
      }

      return right(job)
    } catch (err) {
      console.error(err)
      return left(JobErrors.loadFailed())
    }
  }
}
