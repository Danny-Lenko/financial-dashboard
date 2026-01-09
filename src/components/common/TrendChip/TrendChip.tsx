import { Chip } from '@mui/material';
import { styled } from '@mui/system';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useAppSelector } from '@/store/hooks';
import { selectActiveYearCashflow } from '@/features/cashflow/state/cashflow.selectors';

const ChipStyled = styled(Chip)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  borderColor: theme.palette.divider,

  '& .MuiChip-icon': {
    width: '14px',
    height: '14px',
    marginRight: 0,
  },
}));

function TrendChip({ trend }: { trend: number }) {
  const isYearlyPeriod = useAppSelector(selectActiveYearCashflow) !== null;

  const trendIcon =
    trend >= 0 ? (
      <ArrowUpwardIcon color="success" />
    ) : (
      <ArrowDownwardIcon color="error" />
    );

  const trendContent = trend.toFixed(1) + '%';

  return (
    <ChipStyled
      icon={isYearlyPeriod ? undefined : trendIcon}
      label={isYearlyPeriod ? 'Average' : trendContent}
      variant="outlined"
      size="small"
    />
  );
}
export default TrendChip;
