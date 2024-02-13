import { IInputFindAllCompaniesDto } from '@business/dtos/company/findAll'
import { IInputFindByCompanyDto } from '@business/dtos/company/findBy'
import { IPaginatedResponse } from '@business/dtos/serviceOptions'
import { ICompanyRepository } from '@business/repositories/company/iCompanyRepository'
import { ICompanyEntity } from '@domain/entities/company'
import { injectable } from 'inversify'

@injectable()
export class FakeCompanyRepository implements ICompanyRepository {
  async findBy(_input: IInputFindByCompanyDto): Promise<ICompanyEntity> {
    return void 0
  }

  async findAll(
    _input: IInputFindAllCompaniesDto
  ): Promise<IPaginatedResponse<ICompanyEntity>> {
    return void 0
  }
}

export const fakeCompanyRepositoryFindBy = jest.spyOn(
  FakeCompanyRepository.prototype,
  'findBy'
)

export const fakeCompanyRepositoryFindAll = jest.spyOn(
  FakeCompanyRepository.prototype,
  'findAll'
)
