import { styled } from '@mui/system';

import { ADD_RECORDING_BUTTONS_ORDER } from '../constants/add-recording.constants';
import AddCashflowRecordingButton from '@/components/common/AddRecordingButton/AddRecordingButton';

const Section = styled('section')(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(2),
}));

function AddRecordingSection() {
  return (
    <Section>
      {ADD_RECORDING_BUTTONS_ORDER.map((buttonType) => {
        return (
          <AddCashflowRecordingButton key={buttonType} type={buttonType} />
        );
      })}
    </Section>
  );
}

export default AddRecordingSection;
