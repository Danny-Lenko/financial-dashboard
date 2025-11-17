import { Button, Stack, ButtonGroup } from '@mui/material';
import { styled } from '@mui/system';

const PeriodButton = styled(Button)({
  textTransform: 'capitalize',
  '&:focus': {
    outline: 'none',
  },
});

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
      <PeriodButton variant="outlined">Select period</PeriodButton>
    </Stack>
  );
}

export default PeriodButtonsStack;
