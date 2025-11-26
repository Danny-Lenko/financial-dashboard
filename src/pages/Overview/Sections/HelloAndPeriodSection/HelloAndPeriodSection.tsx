import { Typography } from '@mui/material';
import { styled } from '@mui/system';

import PeriodButtonsStack from './components/PeriodButtonsStack';

const Section = styled('section')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

function HelloAndPeriodSection() {
  return (
    <Section>
      <Typography variant="h1">Hello, Mark!</Typography>
      <PeriodButtonsStack />
    </Section>
  );
}

export default HelloAndPeriodSection;
