import {
  IInputFindByCompanyDto,
  IOutputFindByCompanyDto,
} from '@business/dtos/company/findBy'
import { CompanyErrors } from '@business/errors/company'
import {
  ICompanyRepository,
  ICompanyRepositoryToken,
} from '@business/repositories/company/iCompanyRepository'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractService } from '../abstractService'

@injectable()
export class FindByCompanyService
  implements IAbstractService<IInputFindByCompanyDto, IOutputFindByCompanyDto>
{
  constructor(
    @inject(ICompanyRepositoryToken)
    private companyRepository: ICompanyRepository
  ) {}

  async exec(props: IInputFindByCompanyDto): Promise<IOutputFindByCompanyDto> {
    try {
      const companyResult = await this.companyRepository.findBy(props)

      if (!companyResult) {
        console.error('Error: not found')
        return left(CompanyErrors.notFound())
      }

      return right(companyResult)
    } catch (err) {
      console.error(err)
      return left(CompanyErrors.loadFailed())
    }
  }
}
