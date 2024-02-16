import { IJobEntity } from '@domain/entities/job'
import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export type IInputSendJobToQueueDto = IJobEntity

export type IOutputSendJobToQueueDto = Either<IError, void>
