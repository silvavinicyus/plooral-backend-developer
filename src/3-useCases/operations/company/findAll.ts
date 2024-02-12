import { inject, injectable } from 'inversify'
import { IOutputFindAllCompaniesDto } from '@business/dtos/company/findAll'
import { FindAllCompaniesService } from '@business/services/company/findAllCompanies'
import { AbstractUseCase } from '../abstractOperator'
import { InputFindAllCompanies } from '../../serializers/company/inputFindAll'

@injectable()
export class FindAllCompaniesUseCase extends AbstractUseCase<
  InputFindAllCompanies,
  IOutputFindAllCompaniesDto
> {
  constructor(
    @inject(FindAllCompaniesService)
    private findAllCompanies: FindAllCompaniesService
  ) {
    super()
  }

  async run(input: InputFindAllCompanies): Promise<IOutputFindAllCompaniesDto> {
    this.exec(input)

    const companies = await this.findAllCompanies.exec({
      filters: {
        contains: input.contains,
      },
      pagination: {
        count: input.count,
        page: input.page,
      },
    })

    return companies
  }
}
