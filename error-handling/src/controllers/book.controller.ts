import { Request, Response } from 'express';
import { CreateBookInput } from '../schema';
import { v4 as uuidv4 } from 'uuid';

type Book = CreateBookInput & { id: string };

const BOOKS: Book[] = [];

const addBook = (req: Request<{}, {}, CreateBookInput>, res: Response) => {
  try {
    const { author, title, year } = req.body;

    const newBook: Book = {
      id: uuidv4(),
      author,
      title,
      year,
    };

    BOOKS.push(newBook);

    return res.status(201).json({
      message: 'Book added successfully',
      data: newBook,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: (error as Error).message,
    });
  }
};

const getAllBooks = (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: 'Books retrieved sucessfully',
      data: BOOKS,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: (error as Error).message,
    });
  }
};

const getBook = (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const filteredBook = BOOKS.find((book) => book.id === id);
    if (!filteredBook) {
      return res.status(404).json({
        message: 'Book with this Id doesnt exist',
      });
    }

    return res.status(200).json({
      message: 'Book retrieved sucesfully',
      data: filteredBook,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: (error as Error).message,
    });
  }
};

const updateBook = (
  req: Request<{ id: string }, {}, Partial<CreateBookInput>>,
  res: Response
) => {
  try {
    const { author, title, year } = req.body;
    const { id } = req.params;

    const bookIndex = BOOKS.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      return res.status(404).json({
        message: 'Book with this ID doesn’t exist',
      });
    }

    BOOKS[bookIndex] = {
      ...BOOKS[bookIndex],
      ...(author && { author }),
      ...(title && { title }),
      ...(year && { year }),
    };

    return res.status(200).json({
      message: 'Book updated successfully',
      data: BOOKS[bookIndex],
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: (error as Error).message,
    });
  }
};

const deleteBook = (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const bookIndex = BOOKS.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      return res.status(404).json({
        message: 'Book with this ID doesn’t exist',
      });
    }

    const deletedBook = BOOKS.splice(bookIndex, 1)[0];

    return res.status(200).json({
      message: 'Book deleted successfully',
      data: deletedBook,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: (error as Error).message,
    });
  }
};

export { addBook, getAllBooks, getBook, updateBook, deleteBook };
