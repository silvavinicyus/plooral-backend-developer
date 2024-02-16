import { IError } from '@shared/IError'

export class FileErrors extends IError {
  public static getFailed(): IError {
    return new FileErrors({
      statusCode: 500,
      body: {
        code: 'FILE-001',
        message: 'Failed to get file',
        shortMessage: 'getFailed',
      },
    })
  }
}
