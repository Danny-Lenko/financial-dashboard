import { Box, Paper } from '@mui/material';
import { styled } from '@mui/system';

export const Container = styled(Paper)(({ theme }) => {
  return {
    minWidth: 300,
    padding: theme.spacing(2),
  };
});

export const YearSelector = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
}));

export const MonthGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing(1),
}));
