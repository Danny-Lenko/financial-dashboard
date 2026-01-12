import { EXPENSES_CONFIG } from '@/features/expenses/constants/expenses.constants';
import { parseMonthKey } from '@/shared/utils/parseMonthKey.utils';
import type { PaletteColor, Theme } from '@mui/material/styles';
import type {
  CategoryGroup,
  CategoryStats,
  ExpensesData,
  MonthExpenses,
  YearExpenses,
} from '../types/expenses.types';

export const getCategoryColor = (categoryName: string, theme: Theme) => {
  const config = EXPENSES_CONFIG.find((c) => c.name === categoryName);
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

export const groupExpensesByYear = (
  expensesData: ExpensesData
): Record<number, MonthExpenses[]> => {
  const yearGroups: Record<number, MonthExpenses[]> = {};

  Object.entries(expensesData).forEach(([key, monthData]) => {
    const { year } = parseMonthKey(key);

    if (!yearGroups[year]) {
      yearGroups[year] = [];
    }

    yearGroups[year].push(monthData);
  });

  return yearGroups;
};

const groupCategoriesByYear = (
  yearMonths: MonthExpenses[]
): Record<string, CategoryGroup> => {
  const categoryGroups: Record<string, CategoryGroup> = {};

  yearMonths.forEach((monthData) => {
    monthData.categories.forEach((category) => {
      if (!categoryGroups[category.id]) {
        categoryGroups[category.id] = {
          id: category.id,
          name: category.name,
          amounts: [],
          percentages: [],
        };
      }

      categoryGroups[category.id].amounts.push(category.amount);
      categoryGroups[category.id].percentages.push(category.percentage);
    });
  });

  return categoryGroups;
};

export const calculateCategoryAverages = (
  categoryGroups: Record<string, CategoryGroup>
): CategoryStats[] => {
  return Object.values(categoryGroups)
    .map((category) => {
      const amount =
        category.amounts.reduce((sum, val) => sum + val, 0) /
        category.amounts.length;
      const percentage =
        category.percentages.reduce((sum, val) => sum + val, 0) /
        category.percentages.length;

      return {
        id: category.id,
        name: category.name,
        amount,
        percentage,
        totalAmount: category.amounts.reduce((sum, val) => sum + val, 0),
      };
    })
    .sort((a, b) => Number(a.id) - Number(b.id));
};

export const calculateYearExpenseStats = (
  year: number,
  yearMonths: MonthExpenses[]
): YearExpenses => {
  const monthCount = yearMonths.length;

  const totalExpenses = yearMonths.reduce((sum, m) => sum + m.total, 0);
  const avgMonthlyExpenses = totalExpenses / monthCount;

  const categoryGroups = groupCategoriesByYear(yearMonths);
  const categories = calculateCategoryAverages(categoryGroups);

  return {
    year,
    monthCount,
    totalExpenses,
    avgMonthlyExpenses,
    categories,
  };
};
