import { inject, injectable } from 'inversify'
import {
  IInputFindAllCompaniesDto,
  IOutputFindAllCompaniesDto,
} from '@business/dtos/company/findAll'
import {
  ICompanyRepository,
  ICompanyRepositoryToken,
} from '@business/repositories/company/iCompanyRepository'
import { left, right } from '@shared/either'
import { CompanyErrors } from '@business/errors/company'
import { IAbstractService } from '../abstractService'

@injectable()
export class FindAllCompaniesService
  implements
    IAbstractService<IInputFindAllCompaniesDto, IOutputFindAllCompaniesDto>
{
  constructor(
    @inject(ICompanyRepositoryToken)
    private companyRepository: ICompanyRepository
  ) {}

  async exec(
    props: IInputFindAllCompaniesDto
  ): Promise<IOutputFindAllCompaniesDto> {
    try {
      const companies = await this.companyRepository.findAll(props)

      return right(companies)
    } catch (err) {
      console.error(err)
      return left(CompanyErrors.loadFailed())
    }
  }
}
