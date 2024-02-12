import { Router } from 'express'
import { FindByCompanyController } from './findBy'

const companyRoutes = Router()

const findByCompany = new FindByCompanyController()

companyRoutes.get('/:id', findByCompany.handle)

export { companyRoutes }
