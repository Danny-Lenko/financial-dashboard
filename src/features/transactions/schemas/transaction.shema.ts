import { z } from 'zod';

import { ExpenseCategory } from '@/features/expenses/types/expenses.types';
import { PaymentMethod } from '../types/transaction.types';

export const transactionSchema = z
  .object({
    type: z.enum(['income', 'expense']),
    name: z
      .string('Vendor is required')
      .min(2, 'Vendor name must be at least 2 characters')
      .max(30, 'Vendor name must be at most 30 characters'),
    amount: z.number('Amount is required').positive('Amount must be positive'),
    date: z.date().max(new Date()),
    method: z.enum(PaymentMethod, 'Payment method is required'),
    category: z
      .enum(ExpenseCategory, 'Category is required for expenses')
      .optional(),
    description: z.string().max(1000).optional(),
  })
  .refine(
    (data) => {
      // Category is required only for expenses
      return !(data.type === 'expense' && !data.category);
    },
    {
      message: 'Category is required for expenses',
      path: ['category'],

      // The check runs independently of other fields
      when(payload) {
        const result = z
          .object({ type: z.enum(['income', 'expense']) })
          .safeParse(payload.value);

        return result.success;
      },
    }
  );
