import { Chip } from '@mui/material';
import { styled } from '@mui/system';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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
  const trendIcon =
    trend >= 0 ? (
      <ArrowUpwardIcon color="success" />
    ) : (
      <ArrowDownwardIcon color="error" />
    );

  const trendContent = trend.toFixed(1) + '%';

  return (
    <ChipStyled
      icon={trendIcon}
      label={trendContent}
      variant="outlined"
      size="small"
    />
  );
}
export default TrendChip;
