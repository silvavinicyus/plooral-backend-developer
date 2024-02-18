import '@framework/ioc/inversify.config'
import { UpdateJobUseCase } from '@useCases/operations/job/update'
import { InputUpdateJob } from '@useCases/serializers/job/inputUpdate'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import { Request, Response } from 'express'

export class UpdateJobController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = new InputUpdateJob({
        id: request.params.job_id,
        description: request.body.description,
        title: request.body.title,
        location: request.body.location,
      })

      const useCase = container.get(UpdateJobUseCase)
      const jobResult = await useCase.run(input)

      if (jobResult.isLeft()) {
        throw jobResult.value
      }

      return response.status(200).json(jobResult.value)
    } catch (err) {
      console.error(err)

      if (err instanceof IError) {
        return response.status(err.statusCode).json(err.body)
      }

      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
