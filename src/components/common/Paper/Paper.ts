import { styled } from '@mui/system';
import { Paper as MuiPaper } from '@mui/material';

interface CardProps {
  paddingX?: number;
  paddingY?: number;
}

const Paper = styled(MuiPaper)<CardProps>(
  ({ theme, paddingX = 2, paddingY = 2 }) => ({
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(paddingY, paddingX),
    borderRadius: theme.shape.borderRadius,
  })
);

export default Paper;
