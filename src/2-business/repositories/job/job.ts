import { IInputFindByJobDto } from '@business/dtos/jobs/findBy'
import { ITransaction } from '@business/dtos/transaction/create'
import { IJobEntity, IJobEntityKeys } from '@domain/entities/job'
import { IInputDeleteJobDto } from '@business/dtos/jobs/delete'
import { IWhere } from '../where'

export const IJobRepositoryToken = Symbol.for('IJobRepositoryToken')

export type updateWhereJob = IWhere<keyof IJobEntityKeys, string | number>

export interface IInputUpdateJob {
  updateWhere: updateWhereJob
  newData: Partial<IJobEntity>
}

export interface IJobRepository {
  create(input: IJobEntity, trx?: ITransaction): Promise<IJobEntity>
  findBy(input: IInputFindByJobDto): Promise<IJobEntity>
  update(
    input: IInputUpdateJob,
    trx?: ITransaction
  ): Promise<Partial<IJobEntity>>
  delete(input: IInputDeleteJobDto, trx?: ITransaction): Promise<void>
}
