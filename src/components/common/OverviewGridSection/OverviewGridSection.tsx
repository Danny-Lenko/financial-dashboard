import { styled } from '@mui/system';
import AppSection from '../AppSection/AppSection';

const OverviewGridSection = styled(AppSection)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(2),
}));

export default OverviewGridSection;
