import {
  ICompanyRepository,
  ICompanyRepositoryToken,
} from '@business/repositories/company/iCompanyRepository'
import { CompanyRepository } from '@framework/repositories/CompanyRepository'
import { ContainerModule, interfaces } from 'inversify'

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ICompanyRepository>(ICompanyRepositoryToken).to(CompanyRepository)
})
