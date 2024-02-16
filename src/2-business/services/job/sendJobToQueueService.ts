import { inject, injectable } from 'inversify'
import {
  IInputSendJobToQueueDto,
  IOutputSendJobToQueueDto,
} from '@business/dtos/jobs/sendToQueue'
import { IJobEntity } from '@domain/entities/job'
import {
  IQueueService,
  IQueueServiceToken,
} from '@business/extServices/queue/iQueueService'
import { left, right } from '@shared/either'
import { QueueErrors } from '@business/errors/queue'
import { IAbstractService } from '../abstractService'

@injectable()
export class SendJobToQueueService
  implements
    IAbstractService<IInputSendJobToQueueDto, IOutputSendJobToQueueDto>
{
  constructor(
    @inject(IQueueServiceToken)
    private queueService: IQueueService
  ) {}

  async exec(props: IJobEntity): Promise<IOutputSendJobToQueueDto> {
    try {
      await this.queueService.sendMessage(props)

      return right(void 0)
    } catch (err) {
      console.error(err)
      return left(QueueErrors.errorToQueue())
    }
  }
}
