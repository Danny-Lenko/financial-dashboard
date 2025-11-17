import { Typography } from '@mui/material';

import { CASHFLOW_CATEGORY_TITLES } from '@/constants/cashflow.constants';
import type { CashflowCategory } from '@/types/cashflow.types';

function BalanceCard({
  category,
  amount,
  trend,
}: {
  category: CashflowCategory;
  amount: number;
  trend: number;
}) {
  return (
    <>
      <Typography variant="h3">{CASHFLOW_CATEGORY_TITLES[category]}</Typography>
      <Typography>Amount: {amount.toFixed(2)}</Typography>
      <Typography>Trend: {trend.toFixed(1)}%</Typography>
    </>
  );
}

export default BalanceCard;
