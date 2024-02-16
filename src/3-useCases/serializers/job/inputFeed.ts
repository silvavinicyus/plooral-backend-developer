import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export interface IFeedDto {
  id: string
  company: string
  title: string
  description: string
  created_at: string
}

export type IOutputGetFeedJobsDto = Either<IError, IFeedDto>
