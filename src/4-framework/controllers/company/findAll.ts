import '@framework/ioc/inversify.config'
import { FindAllCompaniesUseCase } from '@root/src/3-useCases/operations/company/findAll'
import { InputFindAllCompanies } from '@root/src/3-useCases/serializers/company/inputFindAll'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import { Request, Response } from 'express'

export class FindAllCompaniesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      console.log({
        value: request.query?.name as string,
      })

      const useCase = container.get(FindAllCompaniesUseCase)
      const input = new InputFindAllCompanies({
        contains: [
          {
            column: 'name',
            value: request.query?.name as string,
          },
        ],
        count: +request.query.count || 10,
        page: +request.query.page || 0,
      })

      const companies = await useCase.run(input)
      if (companies.isLeft()) {
        throw companies.value
      }

      return response.status(200).json(companies.value)
    } catch (err) {
      console.error(err)

      if (err instanceof IError) {
        return response.status(err.statusCode).json(err.body)
      }

      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
