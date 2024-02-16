import { Router } from 'express'
import { ArchiveJobController } from './archive'
import { CreateJobController } from './create'
import { DeleteJobController } from './delete'
import { GetFeedJobController } from './feed'
import { PublishJobController } from './publish'
import { UpdateJobController } from './update'

const jobRoutes = Router()

const createJob = new CreateJobController()
const publishJob = new PublishJobController()
const archiveJob = new ArchiveJobController()
const deleteJob = new DeleteJobController()
const updateJob = new UpdateJobController()
const feedJob = new GetFeedJobController()

jobRoutes.post('/', createJob.handle)
jobRoutes.put('/:job_id/publish', publishJob.handle)
jobRoutes.put('/:job_id/archive', archiveJob.handle)
jobRoutes.delete('/:job_id', deleteJob.handle)
jobRoutes.put('/:job_id', updateJob.handle)
jobRoutes.get('/feed', feedJob.handle)

export { jobRoutes }
