/* eslint-disable @typescript-eslint/no-explicit-any */
import { IQueueService } from '@business/extServices/queue/iQueueService'
import { SQS } from 'aws-sdk'
import { injectable } from 'inversify'

@injectable()
export class SqsService implements IQueueService {
  sqs: SQS

  constructor() {
    this.sqs = new SQS({ region: process.env.S3_REGION })
  }

  params = {
    MessageBody: '',
    QueueUrl: process.env.QUEUE_URL,
  }

  async sendMessage(body: any): Promise<void> {
    try {
      this.params.MessageBody = JSON.stringify(body)
      this.sqs.sendMessage(this.params)
    } catch (err) {
      console.error(err)
    }
  }
}
