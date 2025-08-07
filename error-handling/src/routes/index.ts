import { Request, Response, Router } from 'express';
import { validate } from '../middlewares';
import { createBookSchema, getBookSchema } from '../schema';
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from '../controllers';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome To Hamza Learning Journey',
  });
});

router.post('/create', validate(createBookSchema), addBook);
router.get('/books', getAllBooks);
router.get('/books/:id', validate(getBookSchema), getBook);
router.put('/books/:id', validate(getBookSchema), updateBook);
router.delete('/books/:id', validate(getBookSchema), deleteBook);

export default router;
