import dayjs from 'dayjs';
import type z from 'zod';
import type { InitialTransaction } from '@/features/data/types/initialData.types';
import { useAppDispatch } from '@/store/hooks';
import { useTransactionToast } from './useTransactionToast';
import type { transactionSchema } from '../schemas/transaction.shema';
import { addTransaction } from '@/features/data/state/data.slice';

export function useSubmitTransaction(reset: () => void) {
  const dispatch = useAppDispatch();
  const { showTransactionAdded } = useTransactionToast();

  return async (values: z.infer<typeof transactionSchema>) => {
    const { date, type, amount, ...rest } = values;

    const normalizedDate = dayjs(date).format('YYYY-MM-DD');

    const transaction: InitialTransaction = {
      id: crypto.randomUUID(),
      type,
      date: normalizedDate,
      amount: type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
      createdAt: new Date().toISOString(),
      ...rest,
    };

    dispatch(addTransaction({ transaction }));
    showTransactionAdded({ transaction });
    reset();
  };
}
