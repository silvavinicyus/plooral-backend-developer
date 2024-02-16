import { AbstractEntity } from '@domain/abstractEntity'
import { ITimestamps } from '@domain/timestamps'
import { Right, right } from '@shared/either'

export enum JobStatusEnum {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  REJECTED = 'rejected',
}

export interface IJobEntity extends ITimestamps {
  id: string
  company_id: string
  title: string
  description: string
  location: string
  notes: string
  status: JobStatusEnum
}

export type IInputJobEntity = Pick<
  IJobEntity,
  'company_id' | 'title' | 'description' | 'location' | 'notes' | 'status'
>
export type IJobEntityKeys = Pick<
  IJobEntity,
  'id' | 'company_id' | 'status' | 'title'
>

export class JobEntity extends AbstractEntity<IJobEntity> {
  static create(props: IInputJobEntity): Right<void, JobEntity> {
    const currentDate = new Date()

    const companyEntity = new JobEntity({
      id: undefined,
      created_at: currentDate,
      updated_at: currentDate,
      ...props,
    })

    return right(companyEntity)
  }

  static update(props: Partial<IJobEntity>): Right<void, JobEntity> {
    const currentDate = new Date()

    const companyEntity = new JobEntity({
      ...props,
      updated_at: currentDate,
    } as IJobEntity)

    return right(companyEntity)
  }
}
