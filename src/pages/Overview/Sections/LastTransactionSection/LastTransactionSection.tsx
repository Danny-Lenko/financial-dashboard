import { Card, Typography } from '@mui/material';

function LastTransactionSection() {
  return (
    <Card elevation={1}>
      <Typography variant="subtitle1" fontSize="1.125rem" fontWeight={600}>
        Expenses by category
      </Typography>
    </Card>
  );
}

export default LastTransactionSection;
