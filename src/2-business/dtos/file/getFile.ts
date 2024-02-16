import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export type IInputGetFileDto = {
  key: string
}

export type IOutputGetFileDto = Either<IError, Buffer>
