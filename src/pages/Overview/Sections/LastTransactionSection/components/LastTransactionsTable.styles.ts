import { styled } from '@mui/system';

import {
  TableRow,
  TableHead,
  TableCell,
  Table as MuiTable,
} from '@mui/material';

export const TableWrapper = styled('div')(({ theme }) => ({
  margin: theme.spacing(0, -2.5),
  overflow: 'hidden',
}));

export const Table = styled(MuiTable)({
  width: '100%',
});

export const THead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
}));

export const TR = styled(TableRow)(({ theme }) => ({
  '&:not(:last-child) td, &:not(:last-child) th': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  '&:first-of-type': {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

export const TH = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(0.5, 2.5),
  fontSize: '0.75rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
}));

interface TDProps {
  color?: 'default' | 'secondary' | 'positive' | 'negative';
}
export const TD = styled(TableCell)<TDProps>(({ theme, color = 'default' }) => {
  const colorMap = {
    default: theme.palette.text.primary,
    secondary: theme.palette.text.secondary,
    positive: theme.palette.success.main,
    negative: theme.palette.error.main,
  };

  return {
    padding: theme.spacing(1.75, 2.5),
    fontSize: 'calc(13rem/16)',
    fontWeight: 500,
    color: colorMap[color],
  };
});
