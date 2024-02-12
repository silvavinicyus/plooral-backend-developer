import { IInputFindAllCompaniesDto } from '@business/dtos/company/findAll'
import { IsArray, IsInt, IsOptional } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'
import { IInputPaginatedProps } from '../inputPaginated'

interface IInputFindAllCompaniesSerializer
  extends IInputPaginatedProps<
    IInputFindAllCompaniesDto['filters']['contains']
  > {}

export class InputFindAllCompanies extends AbstractSerializer<IInputFindAllCompaniesSerializer> {
  @IsOptional()
  @IsInt()
  count: number

  @IsOptional()
  @IsInt()
  page: number

  @IsArray()
  contains: IInputFindAllCompaniesDto['filters']['contains']
}
