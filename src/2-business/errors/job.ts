import { IError } from '@shared/IError'

export class JobErrors extends IError {
  public static createFailed(): IError {
    return new JobErrors({
      statusCode: 500,
      body: {
        code: 'JOB-001',
        message: 'Failed to create a job draft',
        shortMessage: 'createFailed',
      },
    })
  }

  public static loadFailed(): IError {
    return new JobErrors({
      statusCode: 500,
      body: {
        code: 'JOB-002',
        message: 'Failed to load jobs list',
        shortMessage: 'loadFailed',
      },
    })
  }

  public static notFound(): IError {
    return new JobErrors({
      statusCode: 404,
      body: {
        code: 'JOB-003',
        message: 'Job not found!',
        shortMessage: 'notFound',
      },
    })
  }

  public static deleteFailed(): IError {
    return new JobErrors({
      statusCode: 500,
      body: {
        code: 'JOB-004',
        message: 'Failed to delete a job!',
        shortMessage: 'deleteFailed',
      },
    })
  }

  public static updateFailed(): IError {
    return new JobErrors({
      statusCode: 500,
      body: {
        code: 'JOB-005',
        message: 'Failed to update a job!',
        shortMessage: 'updateFailed',
      },
    })
  }

  public static publishFailed(): IError {
    return new JobErrors({
      statusCode: 500,
      body: {
        code: 'JOB-006',
        message: 'Failed to publish a job!',
        shortMessage: 'publishFailed',
      },
    })
  }

  public static archiveFailed(): IError {
    return new JobErrors({
      statusCode: 500,
      body: {
        code: 'JOB-007',
        message: 'Failed to archive a job!',
        shortMessage: 'archiveFailed',
      },
    })
  }

  public static alreadyPublished(): IError {
    return new JobErrors({
      statusCode: 500,
      body: {
        code: 'JOB-008',
        message: 'This job have already been published!',
        shortMessage: 'alreadyPublished',
      },
    })
  }

  public static alreadyArchived(): IError {
    return new JobErrors({
      statusCode: 500,
      body: {
        code: 'JOB-009',
        message: 'This job have already been archived!',
        shortMessage: 'alreadyArchived',
      },
    })
  }

  public static terminalState(): IError {
    return new JobErrors({
      statusCode: 500,
      body: {
        code: 'JOB-010',
        message: 'This job is already rejected or archived',
        shortMessage: 'terminalState',
      },
    })
  }
}
