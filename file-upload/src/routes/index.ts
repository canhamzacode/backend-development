import { upload } from '@/config';
import { uploadFile } from '@/controllers';
import { validate } from '@/middlewares';
import { fileUploadSchema } from '@/schema';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'File Upload with multer and cloudinary'
  });
});

router.post('/upload', upload.single('avatar'), validate(fileUploadSchema), uploadFile);

export default router;
