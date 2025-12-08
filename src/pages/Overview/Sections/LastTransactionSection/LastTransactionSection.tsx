import { Typography } from '@mui/material';

import Paper from '@/components/common/Paper/Paper';
import LastTransactionsTable from './components/LastTransactionsTable';

function LastTransactionSection() {
  return (
    <Paper padding={[2, 2, 0]} elevation={1}>
      <Typography variant="subtitle1" fontSize="1.125rem" fontWeight={600}>
        Last transactions
      </Typography>

      <Typography variant="subtitle2" color="text.secondary">
        Check your last transactions
      </Typography>

      <LastTransactionsTable />
    </Paper>
  );
}

export default LastTransactionSection;
