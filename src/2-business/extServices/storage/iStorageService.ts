export const IStorageServiceToken = Symbol.for('IStorageServiceToken')

export interface IFileBuffer {
  content: Buffer
  type: string
}

export interface IFile {
  filename: string
  mimetype: string
  enconding: string
  truncated: boolean
  content: Buffer
}

export interface IStorageService {
  getFile(key: string): Promise<IFileBuffer>
  saveFile(file: IFile, key: string): Promise<void>
}
