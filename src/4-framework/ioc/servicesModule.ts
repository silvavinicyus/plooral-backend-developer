import {
  IQueueService,
  IQueueServiceToken,
} from '@business/extServices/queue/iQueueService'
import {
  IStorageService,
  IStorageServiceToken,
} from '@business/extServices/storage/iStorageService'
import { SqsService } from '@framework/extService/queue/SqsService'
import { S3StorageService } from '@framework/extService/storage/S3Storage'
import { ContainerModule, interfaces } from 'inversify'

export const servicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IQueueService>(IQueueServiceToken).to(SqsService)
  bind<IStorageService>(IStorageServiceToken).to(S3StorageService)
})
