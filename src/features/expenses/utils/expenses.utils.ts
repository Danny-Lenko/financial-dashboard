import { EXPENSE_CATEGORIES_CONFIG } from '@/features/expenses/constants/expenses.constants';
import type { PaletteColor, Theme } from '@mui/material/styles';
import type {
  CategoryStats,
  ExpenseCategory,
  MonthExpenses,
} from '../types/expenses.types';
import type { InitialTransaction } from '@/features/data/types/initialData.types';
import type { PeriodWithType } from '@/features/period/types/period.types';

export const getCategoryColor = (categoryName: string, theme: Theme) => {
  const config = EXPENSE_CATEGORIES_CONFIG.find((c) => c.name === categoryName);
  if (!config) return '#cccccc';

  const palette = config.color.split('.')[0] as
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'info'
    | 'success';
  const shade = config.color.split('.')[1] as keyof PaletteColor;

  return theme.palette[palette][shade];
};

export function calculateExpenses(
  transactions: InitialTransaction[]
): MonthExpenses {
  const categoryMap = new Map<string, number>();
  let total = 0;

  transactions.forEach((t) => {
    if (t.type === 'expense') {
      const category = t.category || 'Other';
      const amount = Math.abs(t.amount);

      total += amount;
      categoryMap.set(category, (categoryMap.get(category) || 0) + amount);
    }
  });

  const categories: CategoryStats[] = Array.from(categoryMap.entries()).map(
    ([name, amount]) => ({
      name: name as ExpenseCategory,
      amount: Math.round(amount * 100) / 100,
      percentage:
        total > 0 ? Math.round((amount / total) * 100 * 100) / 100 : 0,
    })
  );

  categories.sort((a, b) => b.amount - a.amount);

  return {
    total: Math.round(total * 100) / 100,
    categories,
  };
}

export function getPeriodExpenses(
  allExpenses: Map<string, MonthExpenses>,
  { year, month, type }: PeriodWithType
): MonthExpenses {
  // For a Year: average metrics
  if (type === 'year') {
    const categoryTotals = new Map<string, number>();
    let totalExpenses = 0;
    let monthCount = 0;

    for (let m = 0; m < 12; m++) {
      const key = `${year}-${m}`;
      const monthExpenses = allExpenses.get(key);

      if (monthExpenses) {
        monthExpenses.categories.forEach((cat) => {
          categoryTotals.set(
            cat.name,
            (categoryTotals.get(cat.name) || 0) + cat.amount
          );
        });
        totalExpenses += monthExpenses.total;
        monthCount++;
      }
    }

    const avgTotal = monthCount > 0 ? totalExpenses / monthCount : 0;

    const categories = Array.from(categoryTotals.entries()).map(
      ([name, totalAmount]) => {
        const avgAmount = monthCount > 0 ? totalAmount / monthCount : 0;
        return {
          name: name as ExpenseCategory,
          amount: Math.round(avgAmount * 100) / 100,
          percentage:
            avgTotal > 0
              ? Math.round((avgAmount / avgTotal) * 100 * 100) / 100
              : 0,
        };
      }
    );

    categories.sort((a, b) => b.amount - a.amount);

    return {
      total: Math.round(avgTotal * 100) / 100,
      categories,
    };
  }

  // For a Month: direct lookup
  const key = `${year}-${month}`;
  return allExpenses.get(key) || { total: 0, categories: [] };
}
