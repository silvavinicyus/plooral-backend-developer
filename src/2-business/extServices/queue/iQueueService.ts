/* eslint-disable @typescript-eslint/no-explicit-any */
export const IQueueServiceToken = Symbol.for('IQueueServiceToken')

export interface IQueueService {
  sendMessage(body: any): Promise<void>
}
