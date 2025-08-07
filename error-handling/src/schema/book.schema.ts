import { z } from 'zod';

export const createBookSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    author: z.string().min(1),
    year: z.number().min(1900).max(new Date().getFullYear()),
  }),
});

export const createReviewSchema = z.object({
  body: z.object({
    reviewer: z.string().min(1),
    rating: z.number().min(1).max(5),
    comment: z.string().min(1),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const getBookSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type CreateBookInput = z.infer<typeof createBookSchema>['body'];
