import { calculateTrend } from '@/shared/utils/calculateTrend.utils';
import type {
  CashflowTrend,
  MonthlyCashflow,
  YearlyCashflow,
} from '../types/cashflow.types';

export function calculateCashflowTrend(
  current: MonthlyCashflow | YearlyCashflow,
  previous: MonthlyCashflow | YearlyCashflow | null
): CashflowTrend | null {
  if (!previous) return null;

  return {
    incomes: {
      current: current.incomes,
      previous: previous.incomes,
      ...calculateTrend(current.incomes, previous.incomes),
    },
    expenses: {
      current: current.expenses,
      previous: previous.expenses,
      ...calculateTrend(current.expenses, previous.expenses),
    },
    balance: {
      current: current.balance,
      previous: previous.balance,
      ...calculateTrend(current.balance, previous.balance),
    },
  };
}
