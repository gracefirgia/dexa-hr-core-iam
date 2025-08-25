import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

export const FileUploadInterceptor = (fieldName: string, folder: string) => {
  return FileInterceptor(fieldName, {
    storage: diskStorage({
      destination: join(__dirname, `../../../src/assets/uploads/${folder}`),
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return callback(new Error('Only image files (jpt, jpeg, png) are allowed!'), false);
      }
      callback(null, true);
    },
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
  });
};

