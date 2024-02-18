/* eslint-disable @typescript-eslint/no-explicit-any */
import { IQueueService } from '@business/extServices/queue/iQueueService'
import { injectable } from 'inversify'

@injectable()
export class FakeQueueService implements IQueueService {
  async sendMessage(_body: any): Promise<void> {
    return void 0
  }
}

export const fakeQueueServiceSendMessage = jest.spyOn(
  FakeQueueService.prototype,
  'sendMessage'
)
