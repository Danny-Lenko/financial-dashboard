import { createEntityAdapter } from '@reduxjs/toolkit';

import type { InitialTransaction } from '../types/initialData.types';

export const transactionsAdapter = createEntityAdapter<
  InitialTransaction,
  string
>({
  selectId: (transaction) => transaction.id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});
