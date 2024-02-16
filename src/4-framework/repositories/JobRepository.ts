import { IInputUpdateJob, IJobRepository } from '@business/repositories/job/job'
import { IJobEntity } from '@domain/entities/job'
import { JobModel } from '@framework/models/job'
import { injectable } from 'inversify'
import { IInputFindByJobDto } from '@business/dtos/jobs/findBy'
import { createFindByProps } from '@framework/utils/repositoryUtils'
import { IInputDeleteJobDto } from '@business/dtos/jobs/delete'
import { ITransaction } from './TransactionRepository'

@injectable()
export class JobRepository implements IJobRepository {
  async delete(input: IInputDeleteJobDto, trx?: ITransaction): Promise<void> {
    await JobModel.destroy({
      where: {
        id: input.id,
      },
      transaction: trx,
    })
  }

  async findBy(input: IInputFindByJobDto): Promise<IJobEntity> {
    const queryProps = await createFindByProps(input)

    const job = await JobModel.findOne(queryProps)

    if (!job) {
      return void 0
    }

    return job.get({ plain: true })
  }

  async update(
    input: IInputUpdateJob,
    trx?: ITransaction
  ): Promise<Partial<IJobEntity>> {
    await JobModel.update(
      {
        ...input.newData,
      },
      {
        where: {
          [input.updateWhere.column]: input.updateWhere.value,
        },
        transaction: trx,
      }
    )

    return input.newData
  }

  async create(input: IJobEntity, trx?: ITransaction): Promise<IJobEntity> {
    const job = await JobModel.create(input, { transaction: trx })

    return job.get({ plain: true })
  }
}
