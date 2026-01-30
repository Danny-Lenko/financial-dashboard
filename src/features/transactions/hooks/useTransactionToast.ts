import { toast } from 'sonner';
import { useAppDispatch } from '@/store/hooks';

import type { InitialTransaction } from '@/features/data/types/initialData.types';
import { removeTransaction } from '@/features/data/state/data.slice';

interface ShowTransactionToastArgs {
  transaction: Pick<InitialTransaction, 'id' | 'name' | 'amount' | 'type'>;
  year: number;
  month: number;
}

export function useTransactionToast() {
  const dispatch = useAppDispatch();

  const showTransactionAdded = ({
    transaction,
    year,
    month,
  }: ShowTransactionToastArgs) => {
    toast.success(
      transaction.type === 'income' ? 'Income added' : 'Expense added',
      {
        description: `${transaction.name} · ${Math.abs(transaction.amount)}`,
        action: {
          label: 'Undo',
          onClick: () => {
            dispatch(
              removeTransaction({
                year,
                month,
                transactionId: transaction.id,
              })
            );
          },
        },
      }
    );
  };

  return { showTransactionAdded };
}
