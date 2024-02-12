import { IInputFindAllCompaniesDto } from '@business/dtos/company/findAll'
import { IInputFindByCompanyDto } from '@business/dtos/company/findBy'
import { IPaginatedResponse } from '@business/dtos/serviceOptions'
import { ICompanyRepository } from '@business/repositories/company/iCompanyRepository'
import { ICompanyEntity } from '@domain/entities/company'
import { CompanyModel } from '@framework/models/company'
import {
  createFindAllProps,
  createFindByProps,
} from '@framework/utils/repositoryUtils'
import { injectable } from 'inversify'

@injectable()
export class CompanyRepository implements ICompanyRepository {
  async findBy(input: IInputFindByCompanyDto): Promise<ICompanyEntity> {
    const findByProps = createFindByProps(input)

    const company = await CompanyModel.findOne(findByProps)

    if (!company) {
      return void 0
    }

    return company.get({ plain: true })
  }

  async findAll(
    input: IInputFindAllCompaniesDto
  ): Promise<IPaginatedResponse<ICompanyEntity>> {
    const queryProps = createFindAllProps(input)

    const companies = await CompanyModel.findAndCountAll(queryProps)

    return {
      count: companies.count,
      items: companies.rows.map((company) => company.get({ plain: true })),
      page: input.pagination.page,
      perPage: input.pagination.count,
    }
  }
}
