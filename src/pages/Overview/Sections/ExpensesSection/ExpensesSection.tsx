import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

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
      </Card>
    </section>
  );
}

export default ExpensesSection;
