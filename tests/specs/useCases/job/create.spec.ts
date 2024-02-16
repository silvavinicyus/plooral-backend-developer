import { CompanyErrors } from '@business/errors/company'
import { JobErrors } from '@business/errors/job'
import { ICompanyRepositoryToken } from '@business/repositories/company/iCompanyRepository'
import { IJobRepositoryToken } from '@business/repositories/job/job'
import { FindByCompanyService } from '@business/services/company/findByCompany'
import { CreateJobService } from '@business/services/job/createJobService'
import { CreateJobUseCase } from '@root/src/3-useCases/operations/job/create'
import { InputCreateJob } from '@root/src/3-useCases/serializers/job/inputCreate'
import { left, right } from '@shared/either'
import { container } from '@shared/ioc/container'
import { fakeCompanyEntity } from '@tests/mocks/entities/company'
import { fakeJobEntity } from '@tests/mocks/entities/job'
import { FakeCompanyRepository } from '@tests/mocks/repositories/iCompanyRepository'
import { FakeJobRepository } from '@tests/mocks/repositories/iJobRepository'

describe('Create Job Use Case', () => {
  beforeAll(() => {
    container.bind(IJobRepositoryToken).to(FakeJobRepository).inSingletonScope()
    container.bind(CreateJobService).toSelf().inSingletonScope()
    container
      .bind(ICompanyRepositoryToken)
      .to(FakeCompanyRepository)
      .inSingletonScope()
    container.bind(FindByCompanyService).toSelf().inSingletonScope()
  })

  afterAll(() => {
    container.unbindAll()
  })

  test('Should fail to create a job if company does not exists', async () => {
    const input = new InputCreateJob({
      ...fakeJobEntity,
    })

    const findBy = container.get(FindByCompanyService)
    jest
      .spyOn(findBy, 'exec')
      .mockReturnValueOnce(Promise.resolve(left(CompanyErrors.notFound())))

    const sut = container.get(CreateJobUseCase)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(CompanyErrors.notFound())
  })

  test('Should fail to create a job if create job service fail', async () => {
    const input = new InputCreateJob({
      ...fakeJobEntity,
    })

    const findBy = container.get(FindByCompanyService)
    jest
      .spyOn(findBy, 'exec')
      .mockReturnValueOnce(Promise.resolve(right(fakeCompanyEntity)))

    const create = container.get(CreateJobService)
    jest
      .spyOn(create, 'exec')
      .mockReturnValueOnce(Promise.resolve(left(JobErrors.createFailed())))

    const sut = container.get(CreateJobUseCase)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(JobErrors.createFailed())
  })

  test('Should have success to create a job', async () => {
    const input = new InputCreateJob({
      ...fakeJobEntity,
    })

    const findBy = container.get(FindByCompanyService)
    jest
      .spyOn(findBy, 'exec')
      .mockReturnValueOnce(Promise.resolve(right(fakeCompanyEntity)))

    const create = container.get(CreateJobService)
    jest
      .spyOn(create, 'exec')
      .mockReturnValueOnce(Promise.resolve(right(fakeJobEntity)))

    const sut = container.get(CreateJobUseCase)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
  })
})
