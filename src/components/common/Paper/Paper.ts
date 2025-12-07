import { styled } from '@mui/system';
import { Paper as MuiPaper } from '@mui/material';

interface CardProps {
  padding?: number | number[];
}

const Paper = styled(MuiPaper, {
  shouldForwardProp: (prop) => prop !== 'paddingX' && prop !== 'paddingY',
})<CardProps>(({ theme, padding = 2 }) => {
  const getPadding = () => {
    if (Array.isArray(padding)) {
      return padding.map((p) => `${theme.spacing(p)}`).join(' ');
    }
    return theme.spacing(padding);
  };

  return {
    border: `1px solid ${theme.palette.divider}`,
    padding: getPadding(),
    borderRadius: theme.shape.borderRadius,
  };
});

export default Paper;
