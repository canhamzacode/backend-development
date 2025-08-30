import { cloudinary } from '@/config';
import { HTTP_STATUS } from '@/constants';
import { Request, Response } from 'express';

const uploadFile = async (req: Request<{}, {}, { file: string }>, res: Response) => {
  const result = cloudinary.uploader.upload_stream({ folder: 'avatars' }, (error, uploadResult) => {
    if (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ error: error.message });
    }

    return res.status(HTTP_STATUS.OK.code).json({
      message: 'File uploaded successfully',
      data: {
        url: uploadResult.url,
        id: uploadResult.public_id
      }
    });
  });

  const stream = result;
  stream.end(req.file.buffer);
};

export { uploadFile };
