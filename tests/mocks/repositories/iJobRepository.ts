import { IInputDeleteJobDto } from '@business/dtos/jobs/delete'
import { IInputFindByJobDto } from '@business/dtos/jobs/findBy'
import { IInputUpdateJob, IJobRepository } from '@business/repositories/job/job'
import { IJobEntity } from '@domain/entities/job'
import { injectable } from 'inversify'

@injectable()
export class FakeJobRepository implements IJobRepository {
  create(_input: IJobEntity): Promise<IJobEntity> {
    return void 0
  }
  findBy(_input: IInputFindByJobDto): Promise<IJobEntity> {
    return void 0
  }
  update(_input: IInputUpdateJob): Promise<Partial<IJobEntity>> {
    return void 0
  }
  delete(_input: IInputDeleteJobDto): Promise<void> {
    return void 0
  }
}

export const fakeJobRepositoryFindBy = jest.spyOn(
  FakeJobRepository.prototype,
  'findBy'
)

export const fakeJobRepositoryUpdate = jest.spyOn(
  FakeJobRepository.prototype,
  'update'
)

export const fakeJobRepositoryDelete = jest.spyOn(
  FakeJobRepository.prototype,
  'delete'
)

export const fakeJobRepositoryCreate = jest.spyOn(
  FakeJobRepository.prototype,
  'create'
)
