import '@framework/ioc/inversify.config'
import { PublishJobUseCase } from '@root/src/3-useCases/operations/job/publish'
import { InputPublishJob } from '@root/src/3-useCases/serializers/job/inputPublish'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import { Request, Response } from 'express'

export class PublishJobController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = new InputPublishJob({
        id: request.params.job_id,
      })

      const useCase = container.get(PublishJobUseCase)
      const jobResult = await useCase.run(input)

      if (jobResult.isLeft()) {
        throw jobResult.value
      }

      return response.status(204).send()
    } catch (err) {
      console.error(err)

      if (err instanceof IError) {
        return response.status(err.statusCode).json(err.body)
      }

      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
