import { ToggleButton, Stack, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';

import CalendarSvg from '@assets/calendar.svg?react';
import type { Period } from '@/types/select-period.types';
import { PERIOD_BUTTONS_CONFIG } from '@/constants/select-period.constants';

const buttonGroup = PERIOD_BUTTONS_CONFIG.filter((btn) => !btn.isStandalone);
const firstButtonValue = buttonGroup[0].value;
const buttonStandalone = PERIOD_BUTTONS_CONFIG.find((btn) => btn.isStandalone);

const PeriodButton = styled(ToggleButton)(({ theme }) => ({
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderColor: theme.palette.divider,
  padding: theme.spacing(0.7, 2),

  '&:hover': {
    borderColor: theme.palette.divider,
  },

  '&:focus': {
    outline: 'none',
  },

  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },

  svg: {
    marginRight: theme.spacing(0.5),
    transform: 'translateY(-1px)',
  },
}));

const PeriodButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiButton-root': {
    borderColor: theme.palette.divider,
  },
}));

function PeriodButtonsStack() {
  const [period, setPeriod] = useState<Period>(firstButtonValue);

  const handlePeriodChange = (
    _event: React.MouseEvent<HTMLElement>,
    newPeriod: Period | null
  ) => {
    if (newPeriod !== null) {
      setPeriod(newPeriod);
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <PeriodButtonGroup
        value={period}
        exclusive
        onChange={handlePeriodChange}
        aria-label="period selection"
      >
        {buttonGroup.map((button) => (
          <PeriodButton
            key={button.value}
            aria-label={button.label}
            value={button.value}
          >
            {button.content}
          </PeriodButton>
        ))}
      </PeriodButtonGroup>

      {buttonStandalone && (
        <PeriodButton
          aria-label={buttonStandalone.label}
          onChange={handlePeriodChange}
          selected={period === buttonStandalone.value}
          value={buttonStandalone.value}
        >
          <CalendarSvg width={18} height={18} />
          Select period
        </PeriodButton>
      )}
    </Stack>
  );
}

export default PeriodButtonsStack;
