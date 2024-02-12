import { IsNotEmpty, IsUUID } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputFindByCompany extends AbstractSerializer<{ id: string }> {
  @IsUUID('4')
  @IsNotEmpty()
  id: string
}
