import { ADD_RECORDING_BUTTONS_ORDER } from '../constants/add-recording.constants';
import AddCashflowRecordingButton from '@/components/common/AddRecordingButton/AddRecordingButton';
import OverviewGridSection from '@/components/common/OverviewGridSection/OverviewGridSection';
import { useNavigate, useParams } from 'react-router-dom';

function AddRecordingSection() {
  const { type } = useParams();

  const navigate = useNavigate();

  const handleTypeChange = (path: string) => {
    const isAlreadyOnAddPage =
      location.pathname.startsWith('/transactions/add');

    navigate(path, { replace: isAlreadyOnAddPage });
  };

  return (
    <OverviewGridSection>
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
    </OverviewGridSection>
  );
}

export default AddRecordingSection;
