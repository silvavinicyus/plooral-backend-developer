import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export type IInputDeleteJobDto = {
  id: string
}

export type IOutputDeleteJobDto = Either<IError, void>
