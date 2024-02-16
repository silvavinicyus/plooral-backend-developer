import '@framework/ioc/inversify.config'
import { CreateJobUseCase } from '@root/src/3-useCases/operations/job/create'
import { InputCreateJob } from '@root/src/3-useCases/serializers/job/inputCreate'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import { Request, Response } from 'express'

export class CreateJobController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const useCase = container.get(CreateJobUseCase)

      const input = new InputCreateJob({
        company_id: request.body.company_id,
        title: request.body.title,
        description: request.body.description,
        location: request.body.location,
        notes: request.body.notes,
      })

      const job = await useCase.run(input)

      if (job.isLeft()) {
        throw job.value
      }

      return response.status(201).json(job.value)
    } catch (err) {
      console.error(err)

      if (err instanceof IError) {
        return response.status(err.statusCode).json(err.body)
      }

      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
