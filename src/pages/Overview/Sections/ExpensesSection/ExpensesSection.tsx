import { Stack, Typography } from '@mui/material';

import { EXPENSES_CONFIG } from '@/constants/expenses.constants';
import { thisMonthExpensesMock } from '@/mocks/expenses.mocks';
import PieChart from './components/PieChart';
import Paper from '@/components/common/Paper/Paper';

// TODO: PIE CHART GOES BEYOND THE CONTAINER BOUNDS ON SOME RESOLUTIONS - FIX IT

function ExpensesSection() {
  return (
    <section>
      <Paper elevation={1}>
        <Typography variant="subtitle1" color="text.secondary" fontWeight={600}>
          Expenses by category
        </Typography>

        <PieChart />

        {EXPENSES_CONFIG.map((expense) => {
          const { percentage } = thisMonthExpensesMock.categories.find(
            (expenseData) => expenseData.name === expense.name
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
                {percentage}%
              </Typography>
            </Stack>
          );
        })}
      </Paper>
    </section>
  );
}

export default ExpensesSection;
