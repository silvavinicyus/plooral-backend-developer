import '@framework/ioc/inversify.config'
import { ArchiveJobUseCase } from '@useCases/operations/job/archive'
import { InputArchiveJob } from '@useCases/serializers/job/inputArchive'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import { Request, Response } from 'express'

export class ArchiveJobController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = new InputArchiveJob({
        id: request.params.job_id,
      })

      const useCase = container.get(ArchiveJobUseCase)
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
