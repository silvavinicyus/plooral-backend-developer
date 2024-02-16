import { Router } from 'express'
import { CreateJobController } from './create'
import { PublishJobController } from './publish'
import { ArchiveJobController } from './archive'
import { DeleteJobController } from './delete'
import { UpdateJobController } from './update'

const jobRoutes = Router()

const createJob = new CreateJobController()
const publishJob = new PublishJobController()
const archiveJob = new ArchiveJobController()
const deleteJob = new DeleteJobController()
const updateJob = new UpdateJobController()

jobRoutes.post('/', createJob.handle)
jobRoutes.put('/:job_id/publish', publishJob.handle)
jobRoutes.put('/:job_id/archive', archiveJob.handle)
jobRoutes.delete('/:job_id', deleteJob.handle)
jobRoutes.put('/:job_id', updateJob.handle)

export { jobRoutes }
