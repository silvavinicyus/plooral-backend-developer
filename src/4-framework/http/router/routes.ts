import { companyRoutes } from '@framework/controllers/company/company'
import { Router } from 'express'

const router = Router()

router.use('/companies', companyRoutes)

export { router }
