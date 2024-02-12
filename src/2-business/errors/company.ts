import { IError } from '@shared/IError'

export class CompanyErrors extends IError {
  public static loadFailed(): IError {
    return new CompanyErrors({
      statusCode: 500,
      body: {
        code: 'CMP-001',
        message: 'Failed to load companies list',
        shortMessage: 'loadFailed',
      },
    })
  }

  public static notFound(): IError {
    return new CompanyErrors({
      statusCode: 404,
      body: {
        code: 'CMP-002',
        message: 'Company not foun!',
        shortMessage: 'notFound',
      },
    })
  }
}
