import { CompanyEntity } from '@domain/entities/company'
import { fakeCompanyEntity } from '@tests/mocks/entities/company'

describe('Company Entity', () => {
  describe('Create', () => {
    test('Should have success to create an entity', () => {
      const companyEntity = CompanyEntity.create(fakeCompanyEntity)

      expect(companyEntity.isLeft()).toBeFalsy()
      expect(companyEntity.isRight()).toBeTruthy()
    })
  })

  describe('Update', () => {
    test('Should have success to update an entity', () => {
      const updateFields = {
        ...fakeCompanyEntity,
        name: 'New name Update',
        updated_at: new Date(),
      }

      const companyEntity = CompanyEntity.update(updateFields)

      expect(companyEntity.isLeft()).toBeFalsy()
      expect(companyEntity.isRight()).toBeTruthy()
      expect(companyEntity.value.export().name).toEqual(updateFields.name)
    })
  })
})
