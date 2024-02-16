import { IInputCreateJobDto } from '@business/dtos/jobs/create'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputCreateJob extends AbstractSerializer<IInputCreateJobDto> {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsUUID('4')
  company_id: string

  @IsString()
  @IsNotEmpty()
  location: string

  @IsString()
  @IsNotEmpty()
  notes: string
}
