import { Button, Stack, ButtonGroup } from '@mui/material';
import { styled } from '@mui/system';
import CalendarSvg from '@assets/calendar.svg?react';

const PeriodButton = styled(Button)(({ theme }) => ({
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderColor: theme.palette.divider,

  '&:hover': {
    borderColor: theme.palette.divider,
  },

  '&:focus': {
    outline: 'none',
  },

  '.MuiButton-icon': {
    marginRight: theme.spacing(0.5),
    transform: 'translateY(-1px)',
  },
}));

const PeriodButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  '& .MuiButton-root': {
    borderColor: theme.palette.divider,
  },
}));

function PeriodButtonsStack() {
  return (
    <Stack direction="row" spacing={2}>
      <PeriodButtonGroup variant="outlined">
        <PeriodButton variant="outlined">This month</PeriodButton>
        <PeriodButton variant="outlined">Last month</PeriodButton>
        <PeriodButton variant="outlined">This year</PeriodButton>
        <PeriodButton variant="outlined">Last year</PeriodButton>
      </PeriodButtonGroup>
      <PeriodButton
        variant="outlined"
        startIcon={<CalendarSvg width={18} height={18} />}
      >
        Select period
      </PeriodButton>
    </Stack>
  );
}

export default PeriodButtonsStack;
