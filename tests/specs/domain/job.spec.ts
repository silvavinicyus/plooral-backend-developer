import { JobEntity } from '@domain/entities/job'
import { fakeJobEntity } from '@tests/mocks/entities/job'

describe('Job Entity', () => {
  describe('Create', () => {
    test('Should have success to create an entity', () => {
      const job = JobEntity.create(fakeJobEntity)

      expect(job.isLeft()).toBeFalsy()
      expect(job.isRight()).toBeTruthy()
    })
  })

  describe('Update', () => {
    test('Should have success to update an entity', () => {
      const updateFields = {
        ...fakeJobEntity,
        description: 'New Description',
        title: 'New Title',
        updated_at: new Date(),
      }

      const jobEntity = JobEntity.update(updateFields)

      expect(jobEntity.isLeft()).toBeFalsy()
      expect(jobEntity.isRight()).toBeTruthy()
      expect(jobEntity.value.export().title).toEqual(updateFields.title)
      expect(jobEntity.value.export().description).toEqual(
        updateFields.description
      )
    })
  })
})
