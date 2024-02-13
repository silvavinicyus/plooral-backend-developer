import { Router } from 'express'
import { FindByCompanyController } from './findBy'
import { FindAllCompaniesController } from './findAll'

const companyRoutes = Router()

const findByCompany = new FindByCompanyController()
const findAllCompanies = new FindAllCompaniesController()

companyRoutes.get('/:id', findByCompany.handle)
companyRoutes.get('/', findAllCompanies.handle)

export { companyRoutes }
