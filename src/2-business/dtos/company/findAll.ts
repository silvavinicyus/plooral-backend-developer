import { ICompanyEntity, ICompanyEntityKeys } from '@domain/entities/company'
import { IWhere } from '@business/repositories/where'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'
import { IPaginatedResponse, IServiceOptions } from '../serviceOptions'

export interface IInputFindAllCompaniesDto
  extends IServiceOptions<keyof ICompanyEntityKeys, string | number> {
  whereAnd?: IWhere<keyof ICompanyEntityKeys, string | number>[]
  whereOr?: IWhere<keyof ICompanyEntityKeys, string | number>[]
}

export type IOutputFindAllCompaniesDto = Either<
  IError,
  IPaginatedResponse<ICompanyEntity>
>
