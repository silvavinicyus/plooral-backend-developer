import { IJobEntity, IJobEntityKeys } from '@domain/entities/job'
import { IWhere } from '@business/repositories/where'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'
import { IServiceOptions } from '../serviceOptions'

export interface IInputFindByJobDto
  extends IServiceOptions<keyof IJobEntityKeys, string | number> {
  where: IWhere<keyof IJobEntityKeys, string | number>[]
}

export type IOutputFindByJobDto = Either<IError, IJobEntity>
