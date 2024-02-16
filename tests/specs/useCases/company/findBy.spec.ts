import { CompanyErrors } from '@business/errors/company'
import { ICompanyRepositoryToken } from '@business/repositories/company/iCompanyRepository'
import { FindByCompanyService } from '@business/services/company/findByCompany'
import { FindByCompanyUseCase } from '@root/src/3-useCases/operations/company/findBy'
import { InputFindByCompany } from '@root/src/3-useCases/serializers/company/inputFindBy'
import { left, right } from '@shared/either'
import { container } from '@shared/ioc/container'
import { fakeCompanyEntity } from '@tests/mocks/entities/company'
import { FakeCompanyRepository } from '@tests/mocks/repositories/iCompanyRepository'

describe('Find By Company Use Case', () => {
  beforeAll(() => {
    container
      .bind(ICompanyRepositoryToken)
      .to(FakeCompanyRepository)
      .inSingletonScope()
    container.bind(FindByCompanyService).toSelf().inSingletonScope()
  })

  afterAll(() => {
    container.unbindAll()
  })

  test('Should find a company', async () => {
    const input = new InputFindByCompany({
      id: '6e41b9be-4607-4914-abbd-76b0b641873d',
    })

    const service = container.get(FindByCompanyService)
    jest
      .spyOn(service, 'exec')
      .mockReturnValueOnce(Promise.resolve(right(fakeCompanyEntity)))

    const sut = container.get(FindByCompanyUseCase)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
  })

  test('Should fail to find a company if service failed', async () => {
    const input = new InputFindByCompany({
      id: '6e41b9be-4607-4914-abbd-76b0b641873d',
    })

    const service = container.get(FindByCompanyService)
    jest
      .spyOn(service, 'exec')
      .mockReturnValueOnce(Promise.resolve(left(CompanyErrors.loadFailed())))

    const sut = container.get(FindByCompanyUseCase)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(CompanyErrors.loadFailed())
  })

  test('Should fail to find a company if company does not exists', async () => {
    const input = new InputFindByCompany({
      id: '6e41b9be-4607-4914-abbd-76b0b641873d',
    })

    const service = container.get(FindByCompanyService)
    jest
      .spyOn(service, 'exec')
      .mockReturnValueOnce(Promise.resolve(left(CompanyErrors.notFound())))

    const sut = container.get(FindByCompanyUseCase)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(CompanyErrors.notFound())
  })
})
