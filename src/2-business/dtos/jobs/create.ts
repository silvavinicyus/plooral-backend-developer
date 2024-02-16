import { IInputJobEntity, IJobEntity } from '@domain/entities/job'
import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export type IInputCreateJobDto = IInputJobEntity

export type IOutputCreateJobDto = Either<IError, IJobEntity>
