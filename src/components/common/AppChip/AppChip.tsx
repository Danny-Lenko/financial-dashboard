import { Chip, type ChipProps } from '@mui/material';
import { styled } from '@mui/system';

const ChipStyled = styled(Chip)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  borderColor: theme.palette.divider,

  '& .MuiChip-icon': {
    width: '14px',
    height: '14px',
    marginRight: 0,
  },
}));

function AppChip({
  icon,
  label,
  ...rest
}: {
  icon?: React.ReactElement | undefined;
  label: string;
} & ChipProps) {
  return (
    <ChipStyled
      icon={icon}
      label={label}
      variant="outlined"
      size="small"
      {...rest}
    />
  );
}

export default AppChip;
