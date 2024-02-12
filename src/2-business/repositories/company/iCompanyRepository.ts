import { IInputFindAllCompaniesDto } from '@business/dtos/company/findAll'
import { IInputFindByCompanyDto } from '@business/dtos/company/findBy'
import { IPaginatedResponse } from '@business/dtos/serviceOptions'
import { ICompanyEntity } from '@domain/entities/company'

export const ICompanyRepositoryToken = Symbol.for('ICompanyRepositoryToken')

export interface ICompanyRepository {
  findBy(input: IInputFindByCompanyDto): Promise<ICompanyEntity>
  findAll(
    input: IInputFindAllCompaniesDto
  ): Promise<IPaginatedResponse<ICompanyEntity>>
}
