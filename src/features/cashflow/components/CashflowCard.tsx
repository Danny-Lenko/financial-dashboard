import { Stack, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { CASHFLOW_CATEGORY_CONFIG } from '@/features/cashflow/constants/cashflow.constants';
import type { CashflowCategory } from '@/features/cashflow/types/cashflow.types';
import { formatCurrency } from '@/shared/utils/formatters/currency.utils';
import TrendChip from '@/components/common/AppChip/AppChip';
import Paper from '@/components/common/Paper/Paper';
import { useAppSelector } from '@/store/hooks';
import { selectIsYearlyPeriod } from '@/features/period/state/period.selectors';

function CashflowCard({
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

  const isYearlyPeriod = useAppSelector(selectIsYearlyPeriod);
  const chipLabel = isYearlyPeriod ? 'Average' : trend.toFixed(1) + '%';

  const chipIcon = isYearlyPeriod ? undefined : trend >= 0 ? (
    <ArrowUpwardIcon color="success" />
  ) : (
    <ArrowDownwardIcon color="error" />
  );

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
        <TrendChip
          icon={chipIcon}
          label={isYearlyPeriod ? 'Average' : chipLabel}
        />
      </Stack>
    </Paper>
  );
}

export default CashflowCard;
