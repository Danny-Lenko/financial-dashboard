import { Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { CASHFLOW_CATEGORY_CONFIG } from '@/constants/cashflow.constants';
import type { CashflowCategory } from '@/types/cashflow.types';
import { formatCurrency } from '@/utils/cashflow.utils';
import TrendChip from '@/components/common/TrendChip/TrendChip';

const Card = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2, 3),
  borderRadius: theme.shape.borderRadius,
}));

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
    <Card elevation={1}>
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
    </Card>
  );
}

export default BalanceCard;
