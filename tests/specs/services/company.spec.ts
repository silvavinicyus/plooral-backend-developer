import { IInputFindAllCompaniesDto } from '@business/dtos/company/findAll'
import { IInputFindByCompanyDto } from '@business/dtos/company/findBy'
import { CompanyErrors } from '@business/errors/company'
import { ICompanyRepositoryToken } from '@business/repositories/company/iCompanyRepository'
import { FindAllCompaniesService } from '@business/services/company/findAllCompanies'
import { FindByCompanyService } from '@business/services/company/findByCompany'
import { container } from '@shared/ioc/container'
import { fakeCompanyEntity } from '@tests/mocks/entities/company'
import {
  FakeCompanyRepository,
  fakeCompanyRepositoryFindAll,
  fakeCompanyRepositoryFindBy,
} from '@tests/mocks/repositories/iCompanyRepository'

describe('Company Use Case Tests', () => {
  beforeAll(() => {
    container
      .bind(ICompanyRepositoryToken)
      .to(FakeCompanyRepository)
      .inSingletonScope()
  })

  afterAll(() => {
    container.unbindAll()
  })

  describe('Find by Company', () => {
    test('Should have success to find a company', async () => {
      const input: IInputFindByCompanyDto = {
        where: [
          {
            column: 'id',
            value: 'fake-id',
          },
        ],
      }

      fakeCompanyRepositoryFindBy.mockImplementationOnce(
        async () => fakeCompanyEntity
      )

      const sut = container.get(FindByCompanyService)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })

    test('Should fail to find a company if repository fail', async () => {
      const input: IInputFindByCompanyDto = {
        where: [
          {
            column: 'id',
            value: 'fake-id',
          },
        ],
      }

      fakeCompanyRepositoryFindBy.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(FindByCompanyService)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(CompanyErrors.loadFailed())
    })

    test('Should fail to find a company if company does not exists', async () => {
      const input: IInputFindByCompanyDto = {
        where: [
          {
            column: 'id',
            value: 'fake-id',
          },
        ],
      }

      fakeCompanyRepositoryFindBy.mockImplementationOnce(async () => void 0)

      const sut = container.get(FindByCompanyService)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(CompanyErrors.notFound())
    })
  })

  describe('Find All Companies', () => {
    const input: IInputFindAllCompaniesDto = {
      filters: {
        contains: [],
      },
      pagination: {
        count: 10,
        page: 0,
      },
    }

    test('Should failt o find all companies if repository failed', async () => {
      fakeCompanyRepositoryFindAll.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(FindAllCompaniesService)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(CompanyErrors.loadFailed())
    })

    test('Should have success to find all companies', async () => {
      fakeCompanyRepositoryFindAll.mockImplementationOnce(async () => ({
        count: 1,
        items: [fakeCompanyEntity],
        page: 0,
        perPage: 10,
      }))

      const sut = container.get(FindAllCompaniesService)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })
  })
})
