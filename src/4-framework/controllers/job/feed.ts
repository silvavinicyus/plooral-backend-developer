import '@framework/ioc/inversify.config'
import { GetFeedJobsUseCase } from '@useCases/operations/job/feed'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import { Request, Response } from 'express'

export class GetFeedJobController {
  async handle(_request: Request, response: Response): Promise<Response> {
    try {
      const useCase = container.get(GetFeedJobsUseCase)
      const feedResult = await useCase.run()

      if (feedResult.isLeft()) throw feedResult.value

      return response.status(200).json(feedResult.value)
    } catch (err) {
      console.error(err)

      if (err instanceof IError) {
        return response.status(err.statusCode).json(err.body)
      }

      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
