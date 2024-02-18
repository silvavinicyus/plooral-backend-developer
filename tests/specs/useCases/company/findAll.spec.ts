import { CompanyErrors } from '@business/errors/company'
import { ICompanyRepositoryToken } from '@business/repositories/company/iCompanyRepository'
import { FindAllCompaniesService } from '@business/services/company/findAllCompanies'
import { left, right } from '@shared/either'
import { container } from '@shared/ioc/container'
import { fakeCompanyEntity } from '@tests/mocks/entities/company'
import { FakeCompanyRepository } from '@tests/mocks/repositories/iCompanyRepository'
import { FindAllCompaniesUseCase } from '@useCases/operations/company/findAll'
import { InputFindAllCompanies } from '@useCases/serializers/company/inputFindAll'

describe('Find All Companies Use case', () => {
  beforeAll(() => {
    container
      .bind(ICompanyRepositoryToken)
      .to(FakeCompanyRepository)
      .inSingletonScope()
    container.bind(FindAllCompaniesService).toSelf().inSingletonScope()
  })

  afterAll(() => {
    container.unbindAll()
  })

  const input = new InputFindAllCompanies({
    page: 0,
    count: 10,
    contains: [],
  })

  test('Should have success to find all companies', async () => {
    const service = container.get(FindAllCompaniesService)

    jest.spyOn(service, 'exec').mockReturnValueOnce(
      Promise.resolve(
        right({
          count: 10,
          page: 0,
          perPage: 10,
          items: [fakeCompanyEntity],
        })
      )
    )

    const sut = container.get(FindAllCompaniesUseCase)
    const result = await sut.run(input)
    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
  })

  test('Should fail to find all companies if service failed', async () => {
    const service = container.get(FindAllCompaniesService)

    jest
      .spyOn(service, 'exec')
      .mockReturnValueOnce(Promise.resolve(left(CompanyErrors.loadFailed())))

    const sut = container.get(FindAllCompaniesUseCase)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(CompanyErrors.loadFailed())
  })
})
