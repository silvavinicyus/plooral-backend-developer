import { IJobEntity } from '@domain/entities/job'
import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export type IInputUpdateJobDto = Partial<
  Pick<IJobEntity, 'title' | 'location' | 'description' | 'status'>
>

export type IOutputUpdateJobDto = Either<IError, Partial<IJobEntity>>
