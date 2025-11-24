import Grid from '@mui/material/Grid2';
import AddRecordingSection from './Sections/AddRecordingSection/AddRecordingSection';
import CashflowSection from './Sections/CashflowSection/CashflowSection';
import HelloSection from './Sections/HelloSection/HelloSection';
import ExpensesSection from './Sections/ExpensesSection/ExpensesSection';
import LastTransactionSection from './Sections/LastTransactionSection/LastTransactionSection';

function Overview() {
  return (
    <>
      <HelloSection />
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
