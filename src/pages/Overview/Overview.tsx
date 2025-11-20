import AddRecordingSection from './Sections/AddRecordingSection/AddRecordingSection';
import CashflowSection from './Sections/CashflowSection/CashflowSection';
import HelloSection from './Sections/HelloSection/HelloSection';

function Overview() {
  return (
    <>
      <HelloSection />
      <CashflowSection />
      <AddRecordingSection />
    </>
  );
}

export default Overview;
