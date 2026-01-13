import { Button, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { AddRecordingButton as AddRecordingButtonType } from '@/features/add-recording/types/add-recording.types';
import { ADD_RECORDING_BUTTONS_CONFIG } from '@/features/add-recording/constants/add-recording.constants';

const ButtonStyled = styled(Button)(({ theme }) => ({
  width: '100%',
  borderColor: theme.palette.divider,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  gap: theme.spacing(1),
  textTransform: 'none',
  padding: theme.spacing(2, 2),

  '&:hover': {
    borderColor: theme.palette.divider,
  },
}));

function AddCashflowRecordingButton({
  type,
}: {
  type: AddRecordingButtonType;
}) {
  const config = ADD_RECORDING_BUTTONS_CONFIG[type];
  const Icon = config.icon;

  return (
    <ButtonStyled variant="outlined" sx={{ boxShadow: 1 }} fullWidth>
      <Icon />
      <Stack justifyContent="start" alignItems="flex-start">
        <Typography variant="subtitle1" color="text.primary" fontWeight={600}>
          {config.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {config.subtitle}
        </Typography>
      </Stack>
    </ButtonStyled>
  );
}

export default AddCashflowRecordingButton;
