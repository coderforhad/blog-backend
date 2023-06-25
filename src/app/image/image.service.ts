import { FileUpload } from 'graphql-upload';
import { Injectable } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  cloudinary,
} from '../utils/cloudinary.config';

@Injectable()
export class ImageService {
  async uploadImage(file) {
    const { createReadStream, filename } = file;
    const stream = createReadStream();
    let resultUrl = '';
    const cloudinaryUpload = async (stream) => {
      try {
        await new Promise<UploadApiResponse | UploadApiErrorResponse>(
          (resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                resource_type: 'image',
              },
              function (error, result) {
                if (result) {
                  resultUrl = result.url;
                  resolve(result);
                } else {
                  reject(error);
                }
              },
            );
            stream.pipe(uploadStream);
          },
        );
      } catch (error) {
        throw new Error(`Failed to upload Video`);
      }
    };

    await cloudinaryUpload(stream);

    return resultUrl;
  }
}
