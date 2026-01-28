import { styled } from '@mui/system';

interface AppSectionProps {
  marginTop?: number;
}

const AppSection = styled('section', {
  shouldForwardProp: (prop) => prop !== 'marginTop',
})<AppSectionProps>(({ theme, marginTop = 4 }) => ({
  marginTop: theme.spacing(marginTop),
}));

export default AppSection;
