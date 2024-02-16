import { IError } from '@shared/IError'

export class QueueErrors extends IError {
  public static errorToQueue(): IError {
    return new QueueErrors({
      statusCode: 500,
      body: {
        code: 'QUE-001',
        message: 'Failed to queue this information!',
        shortMessage: 'errorToQueue',
      },
    })
  }
}
