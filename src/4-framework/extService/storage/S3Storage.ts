import {
  IFile,
  IFileBuffer,
  IStorageService,
} from '@business/extServices/storage/iStorageService'
import { uploadConfig } from '@framework/utils/storage'
import { S3 } from 'aws-sdk'
import { injectable } from 'inversify'

@injectable()
export class S3StorageService implements IStorageService {
  s3Client: S3

  constructor() {
    this.s3Client = new S3({
      region: uploadConfig.public.region,
    })
  }

  async getFile(key: string): Promise<IFileBuffer> {
    const { Body, ContentType } = await this.s3Client
      .getObject({
        Bucket: uploadConfig.public.bucket,
        Key: `${process.env.STORAGE_FOLDER}/${key}`,
      })
      .promise()

    return {
      content: Body as Buffer,
      type: ContentType,
    }
  }

  async saveFile(file: IFile, key: string): Promise<void> {
    await this.s3Client
      .putObject({
        Bucket: uploadConfig.public.bucket,
        Key: `${process.env.STORAGE_FOLDER}/${key}`,
        Body: file.content,
        ContentType: file.mimetype,
        ACL: 'public-read',
      })
      .promise()
  }
}
