
export interface IUploadCoverResponse {
  message: string;
  path: string;
}

export interface IUploadCoverDto {
  file: Express.Multer.File
}