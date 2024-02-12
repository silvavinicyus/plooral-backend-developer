import { ICompanyEntity, ICompanyEntityKeys } from '@domain/entities/company'
import { IWhere } from '@business/repositories/where'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'
import { IServiceOptions } from '../serviceOptions'

export interface IInputFindByCompanyDto
  extends IServiceOptions<keyof ICompanyEntityKeys, string | number> {
  where: IWhere<keyof ICompanyEntityKeys, string | number>[]
}

export type IOutputFindByCompanyDto = Either<IError, ICompanyEntity>
