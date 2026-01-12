import { Stack, Typography } from '@mui/material';

import { EXPENSES_CONFIG } from '@/features/expenses/constants/expenses.constants';
import PieChart from './PieChart';
import Paper from '@/components/common/Paper/Paper';
import { useAppSelector } from '@/store/hooks';
import { selectActivePeriodExpenses } from '../state/expenses.selectors';
import AppChip from '@/components/common/AppChip/AppChip';

// TODO: PIE CHART GOES BEYOND THE CONTAINER BOUNDS ON SOME RESOLUTIONS - FIX IT

function ExpensesSection() {
  const expensesData = useAppSelector(selectActivePeriodExpenses);

  if (!expensesData) {
    return null;
  }

  const isYearlyStats = 'year' in expensesData;

  const pieChartData = expensesData.categories.map((category) => ({
    name: category.name,
    amount: category.amount,
  }));

  return (
    <section>
      <Paper elevation={1}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          marginBottom={2}
        >
          <Typography
            variant="subtitle1"
            color="text.secondary"
            fontWeight={600}
          >
            Expenses by category
          </Typography>
          {isYearlyStats && (
            <AppChip
              sx={{ marginLeft: 'auto', display: 'inline' }}
              label="Average"
            />
          )}
        </Stack>

        <PieChart data={pieChartData} />

        {EXPENSES_CONFIG.map((expense) => {
          const { percentage } = expensesData.categories.find(
            (expensesData) => expensesData.name === expense.name
          )!;

          return (
            <Stack
              key={expense.name}
              direction="row"
              alignItems="center"
              paddingY={1.5}
              paddingX={1}
              borderBottom={1}
              borderColor="divider"
            >
              <expense.icon />
              <Typography
                variant="body2"
                color="text.primary"
                fontWeight={600}
                marginLeft={1}
              >
                {expense.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                marginLeft="auto"
              >
                {percentage.toFixed(2)}%
              </Typography>
            </Stack>
          );
        })}
      </Paper>
    </section>
  );
}

export default ExpensesSection;
