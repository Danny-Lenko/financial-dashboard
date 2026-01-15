import { Tooltip } from '@mui/material';

interface Props {
  children: React.ReactNode;
  content?: string;
}

const DisabledElementTooltip: React.FC<Props> = ({
  children,
  content = 'Get Premium to unlock 🤣',
}) => {
  return (
    <Tooltip
      title={content}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -8],
              },
            },
          ],
        },
      }}
    >
      <span>{children}</span>
    </Tooltip>
  );
};

export default DisabledElementTooltip;
