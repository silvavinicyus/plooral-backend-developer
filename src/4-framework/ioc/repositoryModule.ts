import {
  ICompanyRepository,
  ICompanyRepositoryToken,
} from '@business/repositories/company/iCompanyRepository'
import {
  IJobRepository,
  IJobRepositoryToken,
} from '@business/repositories/job/job'
import { CompanyRepository } from '@framework/repositories/CompanyRepository'
import { JobRepository } from '@framework/repositories/JobRepository'
import { ContainerModule, interfaces } from 'inversify'

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ICompanyRepository>(ICompanyRepositoryToken).to(CompanyRepository)
  bind<IJobRepository>(IJobRepositoryToken).to(JobRepository)
})
