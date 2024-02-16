import { companyRoutes } from '@framework/controllers/company/company'
import { jobRoutes } from '@framework/controllers/job/job'
import { Router } from 'express'

const router = Router()

router.use('/companies', companyRoutes)
router.use('/job', jobRoutes)

export { router }
