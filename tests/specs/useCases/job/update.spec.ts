import { JobErrors } from '@business/errors/job'
import { IJobRepositoryToken } from '@business/repositories/job/job'
import { FindByJobService } from '@business/services/job/findByJobService'
import { UpdateJobService } from '@business/services/job/updateJobService'
import { UpdateJobUseCase } from '@useCases/operations/job/update'
import { InputUpdateJob } from '@useCases/serializers/job/inputUpdate'
import { left, right } from '@shared/either'
import { container } from '@shared/ioc/container'
import { fakeJobEntity } from '@tests/mocks/entities/job'
import { FakeJobRepository } from '@tests/mocks/repositories/iJobRepository'

describe('Archive Job UseCase', () => {
  beforeAll(() => {
    container.bind(IJobRepositoryToken).to(FakeJobRepository).inSingletonScope()
    container.bind(UpdateJobService).toSelf().inSingletonScope()
    container.bind(FindByJobService).toSelf().inSingletonScope()
  })

  afterAll(() => {
    container.unbindAll()
  })

  const input = new InputUpdateJob({
    description: 'Description',
    id: '6e41b9be-4607-4914-abbd-76b0b641873d',
    location: 'Maceio, AL',
  })

  test('Should fail to update a job if job does not exists', async () => {
    const findBy = container.get(FindByJobService)
    jest
      .spyOn(findBy, 'exec')
      .mockReturnValueOnce(Promise.resolve(left(JobErrors.notFound())))

    const sut = container.get(UpdateJobUseCase)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(JobErrors.notFound())
  })

  test('Should fail to archive a job if update job service failed', async () => {
    const findBy = container.get(FindByJobService)
    jest
      .spyOn(findBy, 'exec')
      .mockReturnValueOnce(Promise.resolve(right(fakeJobEntity)))

    const update = container.get(UpdateJobService)
    jest
      .spyOn(update, 'exec')
      .mockReturnValueOnce(Promise.resolve(left(JobErrors.archiveFailed())))

    const sut = container.get(UpdateJobUseCase)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(JobErrors.archiveFailed())
  })

  test('Should have success to archive a job', async () => {
    const findBy = container.get(FindByJobService)
    jest
      .spyOn(findBy, 'exec')
      .mockReturnValueOnce(Promise.resolve(right(fakeJobEntity)))

    const update = container.get(UpdateJobService)
    jest
      .spyOn(update, 'exec')
      .mockReturnValueOnce(
        Promise.resolve(right({ ...fakeJobEntity, ...input }))
      )

    const sut = container.get(UpdateJobUseCase)
    const result = await sut.run(input)

    expect(result.isRight()).toBeTruthy()
    expect(result.isLeft()).toBeFalsy()
  })
})
