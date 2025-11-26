import { EXPENSES_CONFIG } from '@/constants/expenses.constants';
import type { PaletteColor, Theme } from '@mui/material/styles';

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
