import '@framework/ioc/inversify.config'
import { FindByCompanyUseCase } from '@root/src/3-useCases/operations/company/findBy'
import { InputFindByCompany } from '@root/src/3-useCases/serializers/company/inputFindBy'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import { Request, Response } from 'express'

export class FindByCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const useCase = container.get(FindByCompanyUseCase)

      const input = new InputFindByCompany({
        id: request.params.id as string,
      })

      const company = await useCase.run(input)

      if (company.isLeft()) {
        throw company.value
      }

      return response.status(200).json(company.value)
    } catch (err) {
      console.error(err)

      if (err instanceof IError) {
        return response.status(err.statusCode).json(err.body)
      }

      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
