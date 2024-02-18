import { JobErrors } from '@business/errors/job'
import { QueueErrors } from '@business/errors/queue'
import { IQueueServiceToken } from '@business/extServices/queue/iQueueService'
import { IJobRepositoryToken } from '@business/repositories/job/job'
import { FindByJobService } from '@business/services/job/findByJobService'
import { SendJobToQueueService } from '@business/services/job/sendJobToQueueService'
import { JobStatusEnum } from '@domain/entities/job'
import { PublishJobUseCase } from '@root/src/3-useCases/operations/job/publish'
import { InputPublishJob } from '@root/src/3-useCases/serializers/job/inputPublish'
import { left, right } from '@shared/either'
import { container } from '@shared/ioc/container'
import { fakeJobEntity } from '@tests/mocks/entities/job'
import { FakeStorageService } from '@tests/mocks/extServices/fakeStorageService'
import { FakeJobRepository } from '@tests/mocks/repositories/iJobRepository'

describe('Publish Job UseCase', () => {
  beforeAll(() => {
    container.bind(IJobRepositoryToken).to(FakeJobRepository).inSingletonScope()
    container.bind(FindByJobService).toSelf().inSingletonScope()
    container.bind(IQueueServiceToken).to(FakeStorageService)
    container.bind(SendJobToQueueService).toSelf().inSingletonScope()
  })

  afterAll(() => {
    container.unbindAll()
  })

  const input = new InputPublishJob({
    id: '6e41b9be-4607-4914-abbd-76b0b641873d',
  })

  test('Should fail to publish a job if job does not exists', async () => {
    const findBy = container.get(FindByJobService)
    jest
      .spyOn(findBy, 'exec')
      .mockReturnValueOnce(Promise.resolve(left(JobErrors.notFound())))

    const sut = container.get(PublishJobUseCase)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(JobErrors.notFound())
  })

  test('Should fail to publish a job if job status is published', async () => {
    const findBy = container.get(FindByJobService)
    jest
      .spyOn(findBy, 'exec')
      .mockReturnValueOnce(
        Promise.resolve(
          right({ ...fakeJobEntity, status: JobStatusEnum.PUBLISHED })
        )
      )

    const sut = container.get(PublishJobUseCase)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(JobErrors.alreadyPublished())
  })

  test('Should fail to publish a job if job status is archived or rejected', async () => {
    const findBy = container.get(FindByJobService)
    jest
      .spyOn(findBy, 'exec')
      .mockReturnValueOnce(
        Promise.resolve(
          right({ ...fakeJobEntity, status: JobStatusEnum.ARCHIVED })
        )
      )

    const sut = container.get(PublishJobUseCase)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(JobErrors.terminalState())
  })

  test('Should fail to publish a job if job status is archived or rejected', async () => {
    const findBy = container.get(FindByJobService)
    jest
      .spyOn(findBy, 'exec')
      .mockReturnValueOnce(
        Promise.resolve(
          right({ ...fakeJobEntity, status: JobStatusEnum.REJECTED })
        )
      )

    const sut = container.get(PublishJobUseCase)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(JobErrors.terminalState())
  })

  test('Should fail to publish a job if queue service failed', async () => {
    const findBy = container.get(FindByJobService)
    jest
      .spyOn(findBy, 'exec')
      .mockReturnValueOnce(Promise.resolve(right(fakeJobEntity)))

    const service = container.get(SendJobToQueueService)
    jest
      .spyOn(service, 'exec')
      .mockReturnValueOnce(Promise.resolve(left(QueueErrors.errorToQueue())))

    const sut = container.get(PublishJobUseCase)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(QueueErrors.errorToQueue())
  })

  test('Should have success to publish a job', async () => {
    const findBy = container.get(FindByJobService)
    jest
      .spyOn(findBy, 'exec')
      .mockReturnValueOnce(Promise.resolve(right(fakeJobEntity)))

    const service = container.get(SendJobToQueueService)
    jest
      .spyOn(service, 'exec')
      .mockReturnValueOnce(Promise.resolve(right(void 0)))

    const sut = container.get(PublishJobUseCase)
    const result = await sut.run(input)

    expect(result.isRight()).toBeTruthy()
    expect(result.isLeft()).toBeFalsy()
  })
})
