import { JobErrors } from '@business/errors/job'
import { IJobRepositoryToken } from '@business/repositories/job/job'
import { DeleteJobService } from '@business/services/job/deleteJobService'
import { FindByJobService } from '@business/services/job/findByJobService'
import { DeleteJobUseCase } from '@useCases/operations/job/delete'
import { InputDeleteJob } from '@useCases/serializers/job/inputDelete'
import { left, right } from '@shared/either'
import { container } from '@shared/ioc/container'
import { fakeJobEntity } from '@tests/mocks/entities/job'
import { FakeJobRepository } from '@tests/mocks/repositories/iJobRepository'

describe('Delete Job UseCase', () => {
  beforeAll(() => {
    container.bind(IJobRepositoryToken).to(FakeJobRepository).inSingletonScope()
    container.bind(DeleteJobService).toSelf().inSingletonScope()
    container.bind(FindByJobService).toSelf().inSingletonScope()
  })

  afterAll(() => {
    container.unbindAll()
  })

  const input = new InputDeleteJob({
    id: '6e41b9be-4607-4914-abbd-76b0b641873d',
  })

  test('Should fail to delete a job if job does not exists', async () => {
    const findBy = container.get(FindByJobService)
    jest
      .spyOn(findBy, 'exec')
      .mockReturnValueOnce(Promise.resolve(left(JobErrors.notFound())))

    const sut = container.get(DeleteJobUseCase)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(JobErrors.notFound())
  })

  test('Should fail to delete a job if delete job service failed', async () => {
    const findBy = container.get(FindByJobService)
    jest
      .spyOn(findBy, 'exec')
      .mockReturnValueOnce(Promise.resolve(right(fakeJobEntity)))

    const deleteJob = container.get(DeleteJobService)
    jest
      .spyOn(deleteJob, 'exec')
      .mockReturnValueOnce(Promise.resolve(left(JobErrors.deleteFailed())))

    const sut = container.get(DeleteJobUseCase)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(JobErrors.deleteFailed())
  })

  test('Should have success to delete a job', async () => {
    const findBy = container.get(FindByJobService)
    jest
      .spyOn(findBy, 'exec')
      .mockReturnValueOnce(Promise.resolve(right(fakeJobEntity)))

    const deleteJob = container.get(DeleteJobService)
    jest
      .spyOn(deleteJob, 'exec')
      .mockReturnValueOnce(Promise.resolve(right(void 0)))

    const sut = container.get(DeleteJobUseCase)
    const result = await sut.run(input)

    expect(result.isRight()).toBeTruthy()
    expect(result.isLeft()).toBeFalsy()
  })
})
