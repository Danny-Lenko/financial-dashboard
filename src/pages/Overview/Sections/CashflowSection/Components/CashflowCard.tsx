import { Stack, Typography } from '@mui/material';

import { CASHFLOW_CATEGORY_CONFIG } from '@/constants/cashflow.constants';
import type { CashflowCategory } from '@/types/cashflow.types';
import { formatCurrency } from '@/utils/cashflow.utils';
import TrendChip from '@/components/common/TrendChip/TrendChip';
import Paper from '@/components/common/Paper/Paper';

function BalanceCard({
  category,
  amount,
  trend,
}: {
  category: CashflowCategory;
  amount: number;
  trend: number;
}) {
  const { title, amountColor } = CASHFLOW_CATEGORY_CONFIG[category];
  const h2Content = formatCurrency(amount);

  return (
    <Paper padding={[2, 3]} elevation={1}>
      <Typography color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Stack
        direction="row"
        alignItems="baseline"
        justifyContent="space-between"
      >
        <Typography variant="h2" color={amountColor}>
          {h2Content}
        </Typography>
        <TrendChip trend={trend} />
      </Stack>
    </Paper>
  );
}

export default BalanceCard;
