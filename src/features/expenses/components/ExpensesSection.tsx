import { Stack, Typography } from '@mui/material';

import { EXPENSE_CATEGORIES_CONFIG } from '@/features/expenses/constants/expenses.constants';
import PieChart from './PieChart';
import Paper from '@/components/common/Paper/Paper';
import { useAppSelector } from '@/store/hooks';
import { selectActivePeriodExpenses } from '../state/expenses.selectors';
import AppChip from '@/components/common/AppChip/AppChip';
import { selectActivePeriod } from '@/features/period/state/period.selectors';

function ExpensesSection() {
  const activePeriod = useAppSelector(selectActivePeriod);
  const activePeriodExpenses = useAppSelector(selectActivePeriodExpenses);

  if (!activePeriodExpenses) {
    return null;
  }

  const pieChartData = activePeriodExpenses.categories.map((category) => ({
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
          {activePeriod.type === 'year' && (
            <AppChip
              sx={{ marginLeft: 'auto', display: 'inline' }}
              label="Average"
            />
          )}
        </Stack>

        <PieChart data={pieChartData} />

        {activePeriodExpenses.categories.map((expense) => {
          const Icon = EXPENSE_CATEGORIES_CONFIG.find(
            (cat) => cat.name === expense.name
          )!.icon;

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
              <Icon />
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
                {expense.percentage.toFixed(2)}%
              </Typography>
            </Stack>
          );
        })}
      </Paper>
    </section>
  );
}

export default ExpensesSection;
