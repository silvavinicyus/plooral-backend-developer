import { AbstractEntity } from '@domain/abstractEntity'
import { ITimestamps } from '@domain/timestamps'
import { Right, right } from '@shared/either'

interface ICompanyRelations {}

export interface ICompanyEntity
  extends ITimestamps,
    Partial<ICompanyRelations> {
  id: string
  name: string
}

export type IInputCompanyEntity = Pick<ICompanyEntity, 'name'>
export type ICompanyEntityKeys = Pick<ICompanyEntity, 'name' | 'id'>

export class CompanyEntity extends AbstractEntity<ICompanyEntity> {
  static create(props: IInputCompanyEntity): Right<void, CompanyEntity> {
    const currentDate = new Date()

    const companyEntity = new CompanyEntity({
      id: undefined,
      created_at: currentDate,
      updated_at: currentDate,
      ...props,
    })

    return right(companyEntity)
  }

  static update(props: Partial<ICompanyEntity>): Right<void, CompanyEntity> {
    const currentDate = new Date()

    const companyEntity = new CompanyEntity({
      ...props,
      updated_at: currentDate,
    } as ICompanyEntity)

    return right(companyEntity)
  }
}
