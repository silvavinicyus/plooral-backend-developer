import { IInputUpdateJobDto } from '@business/dtos/jobs/update'
import { IsOptional, IsString, IsUUID, IsNotEmpty } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export type IInputUpdateJobSerializer = Partial<
  Pick<IInputUpdateJobDto, 'title' | 'description' | 'location'>
> & {
  id: string
}

export class InputUpdateJob extends AbstractSerializer<IInputUpdateJobSerializer> {
  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsString()
  location: string

  @IsUUID('4')
  @IsNotEmpty()
  id: string
}
