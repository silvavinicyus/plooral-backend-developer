import { IJobEntity, JobStatusEnum } from '@domain/entities/job'

export const fakeJobEntity: IJobEntity = {
  id: '6e41b9be-4607-4914-abbd-76b0b641873d',
  company_id: '6e41b9be-4607-4914-abbd-76b0b641873d',
  created_at: new Date(),
  updated_at: new Date(),
  description: 'This is description',
  location: 'Maceió, AL',
  notes: 'NodeJs, ExpressJs',
  status: JobStatusEnum.DRAFT,
  title: 'This is the title',
}
