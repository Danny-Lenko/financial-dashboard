import { styled } from '@mui/system';

import { ADD_RECORDING_BUTTONS_ORDER } from '../constants/add-recording.constants';
import AddCashflowRecordingButton from '@/components/common/AddRecordingButton/AddRecordingButton';
import { useNavigate, useParams } from 'react-router-dom';

const Section = styled('section')(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(2),
}));

function AddRecordingSection() {
  const { type } = useParams();

  const navigate = useNavigate();

  const handleTypeChange = (path: string) => {
    const isAlreadyOnAddPage =
      location.pathname.startsWith('/transactions/add');

    navigate(path, { replace: isAlreadyOnAddPage });
  };

  return (
    <Section>
      {ADD_RECORDING_BUTTONS_ORDER.map((buttonType) => {
        return (
          <AddCashflowRecordingButton
            key={buttonType}
            type={buttonType}
            onClick={handleTypeChange}
            isActive={type === buttonType}
          />
        );
      })}
    </Section>
  );
}

export default AddRecordingSection;
