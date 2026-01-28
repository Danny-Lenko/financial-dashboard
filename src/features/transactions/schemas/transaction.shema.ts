import { z } from 'zod';

import { ExpenseCategory } from '@/features/expenses/types/expenses.types';
import { PaymentMethod } from '../types/transaction.types';

export const transactionSchema = z
  .object({
    type: z.enum(['income', 'expense']),
    name: z.string().min(2),
    amount: z.number().positive(),
    category: z.enum(ExpenseCategory).optional(),
    method: z.enum(PaymentMethod),
    date: z.date().max(new Date()),
    description: z.string().max(1000).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'expense' && !data.category) {
      ctx.addIssue({
        code: 'custom',
        message: 'Category is required for expenses',
        path: ['category'],
      });
    }
  });
