import { Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { EXPENSES_CONFIG } from '@/constants/expenses.constants';
import { thisMonthExpensesMock } from '@/mocks/expenses.mocks';
import PieChart from './components/PieChart';

const Card = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2, 2),
  borderRadius: theme.shape.borderRadius,
}));

function ExpensesSection() {
  return (
    <section>
      <Card elevation={1}>
        <Typography variant="subtitle1" color="text.primary" fontWeight={600}>
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
      </Card>
    </section>
  );
}

export default ExpensesSection;
