import Grid from '@mui/material/Grid2';

import AddRecordingSection from '../features/add-recording/components/AddRecordingSection';
import CashflowSection from '@/features/cashflow/components/CashflowSection';
import HelloAndPeriodSection from '@/features/period/components/HelloAndPeriodSection';
import ExpensesSection from '@/features/expenses/components/ExpensesSection';
import LastTransactionSection from '@/features/last-transactions/components/LastTransactionSection';

function Overview() {
  return (
    <>
      <HelloAndPeriodSection />
      <CashflowSection />
      <AddRecordingSection />
      <Grid container spacing={2} marginTop={4} alignItems="flex-start">
        <Grid component="section" size={{ xs: 12, md: 4 }}>
          <ExpensesSection />
        </Grid>
        <Grid component="section" size={{ xs: 12, md: 8 }}>
          <LastTransactionSection />
        </Grid>
      </Grid>
    </>
  );
}

export default Overview;
