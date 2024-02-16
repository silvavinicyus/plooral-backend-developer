import { IInputCreateJobDto } from '@business/dtos/jobs/create'
import { IInputDeleteJobDto } from '@business/dtos/jobs/delete'
import { IInputFindByJobDto } from '@business/dtos/jobs/findBy'
import { JobErrors } from '@business/errors/job'
import {
  IInputUpdateJob,
  IJobRepositoryToken,
} from '@business/repositories/job/job'
import { CreateJobService } from '@business/services/job/createJobService'
import { DeleteJobService } from '@business/services/job/deleteJobService'
import { FindByJobService } from '@business/services/job/findByJobService'
import { UpdateJobService } from '@business/services/job/updateJobService'
import { JobStatusEnum } from '@domain/entities/job'
import { container } from '@shared/ioc/container'
import { fakeJobEntity } from '@tests/mocks/entities/job'
import {
  FakeJobRepository,
  fakeJobRepositoryCreate,
  fakeJobRepositoryDelete,
  fakeJobRepositoryFindBy,
  fakeJobRepositoryUpdate,
} from '@tests/mocks/repositories/iJobRepository'

describe('Job Service Tests', () => {
  beforeAll(() => {
    container.bind(IJobRepositoryToken).to(FakeJobRepository).inSingletonScope()
  })

  afterAll(() => {
    container.unbindAll()
  })

  describe('Create Job Service', () => {
    test('Should fail to create a job if repository failed', async () => {
      const input: IInputCreateJobDto = {
        title: 'This title',
        company_id: '6e41b9be-4607-4914-abbd-76b0b641873d',
        description: 'Description',
        location: 'New Location, WR',
        notes: 'NodeJs, C#',
        status: JobStatusEnum.DRAFT,
      }

      fakeJobRepositoryCreate.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(CreateJobService)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(JobErrors.createFailed())
    })

    test('Should have success to create a job', async () => {
      const input: IInputCreateJobDto = {
        title: 'This title',
        company_id: '6e41b9be-4607-4914-abbd-76b0b641873d',
        description: 'Description',
        location: 'New Location, WR',
        notes: 'NodeJs, C#',
        status: JobStatusEnum.DRAFT,
      }

      fakeJobRepositoryCreate.mockImplementationOnce(async () => ({
        ...fakeJobEntity,
        ...input,
      }))

      const sut = container.get(CreateJobService)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })
  })

  describe('Find By Job Service', () => {
    const input: IInputFindByJobDto = {
      where: [
        {
          column: 'id',
          value: '6e41b9be-4607-4914-abbd-76b0b641873d',
        },
      ],
    }

    test('Should have success to find a job', async () => {
      fakeJobRepositoryFindBy.mockImplementationOnce(async () => fakeJobEntity)

      const sut = container.get(FindByJobService)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })

    test('Should fail to find a job if repository failed', async () => {
      fakeJobRepositoryFindBy.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(FindByJobService)
      const result = await sut.exec(input)

      expect(result.isRight()).toBeFalsy()
      expect(result.isLeft()).toBeTruthy()
      expect(result.value).toEqual(JobErrors.loadFailed())
    })

    test('Should fail to find a job if job does not exists', async () => {
      fakeJobRepositoryFindBy.mockImplementationOnce(async () => void 0)

      const sut = container.get(FindByJobService)
      const result = await sut.exec(input)

      expect(result.isRight()).toBeFalsy()
      expect(result.isLeft()).toBeTruthy()
      expect(result.value).toEqual(JobErrors.notFound())
    })
  })

  describe('Update Job Service', () => {
    const input: IInputUpdateJob = {
      newData: {
        location: 'São Paulo, SP',
        title: 'New New title',
      },
      updateWhere: {
        column: 'id',
        value: '6e41b9be-4607-4914-abbd-76b0b641873d',
      },
    }

    test('Should fail to update a job if service failed', async () => {
      fakeJobRepositoryUpdate.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(UpdateJobService)
      const result = await sut.exec(input.newData, input.updateWhere)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(JobErrors.updateFailed())
    })

    test('Should have succes to update a job', async () => {
      fakeJobRepositoryUpdate.mockImplementationOnce(async () => fakeJobEntity)

      const sut = container.get(UpdateJobService)
      const result = await sut.exec(input.newData, input.updateWhere)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })
  })

  describe('Delete Job Service', () => {
    const input: IInputDeleteJobDto = {
      id: '6e41b9be-4607-4914-abbd-76b0b641873d',
    }

    test('Should fail to delete a job', async () => {
      fakeJobRepositoryDelete.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(DeleteJobService)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(JobErrors.deleteFailed())
    })

    test('Should have success to delete a job', async () => {
      fakeJobRepositoryDelete.mockImplementationOnce(async () => void 0)

      const sut = container.get(DeleteJobService)
      const result = await sut.exec(input)

      expect(result.isRight()).toBeTruthy()
      expect(result.isLeft()).toBeFalsy()
    })
  })
})
