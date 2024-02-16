import '@framework/ioc/inversify.config'
import { DeleteJobUseCase } from '@root/src/3-useCases/operations/job/delete'
import { InputDeleteJob } from '@root/src/3-useCases/serializers/job/inputDelete'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import { Request, Response } from 'express'

export class DeleteJobController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = new InputDeleteJob({
        id: request.params.job_id,
      })

      const useCase = container.get(DeleteJobUseCase)
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
