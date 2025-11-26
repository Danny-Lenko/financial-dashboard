import Grid from '@mui/material/Grid2';

import AddRecordingSection from './sections/AddRecordingSection/AddRecordingSection';
import CashflowSection from './sections/CashflowSection/CashflowSection';
import HelloAndPeriodSection from './sections/HelloAndPeriodSection/HelloAndPeriodSection';
import ExpensesSection from './sections/ExpensesSection/ExpensesSection';
import LastTransactionSection from './sections/LastTransactionSection/LastTransactionSection';

function Overview() {
  return (
    <>
      <HelloAndPeriodSection />
      <CashflowSection />
      <AddRecordingSection />
      <Grid container spacing={2} marginTop={4} alignItems="flex-start">
        <Grid size={{ xs: 12, md: 4 }}>
          <ExpensesSection />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <LastTransactionSection />
        </Grid>
      </Grid>
    </>
  );
}

export default Overview;
