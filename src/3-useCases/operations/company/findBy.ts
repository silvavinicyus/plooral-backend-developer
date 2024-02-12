import { IOutputFindByCompanyDto } from '@business/dtos/company/findBy'
import { FindByCompanyService } from '@business/services/company/findByCompany'
import { inject, injectable } from 'inversify'
import { InputFindByCompany } from '../../serializers/company/inputFindBy'
import { AbstractUseCase } from '../abstractOperator'

@injectable()
export class FindByCompanyUseCase extends AbstractUseCase<
  InputFindByCompany,
  IOutputFindByCompanyDto
> {
  constructor(
    @inject(FindByCompanyService)
    private findByCompany: FindByCompanyService
  ) {
    super()
  }

  async run(input: InputFindByCompany): Promise<IOutputFindByCompanyDto> {
    this.exec(input)

    const company = await this.findByCompany.exec({
      where: [
        {
          column: 'id',
          value: input.id,
        },
      ],
    })

    return company
  }
}
