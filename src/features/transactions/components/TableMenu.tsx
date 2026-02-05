import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

export default function TableMenu({ id }: { id: string }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
    navigate(`/transactions/${id}`);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="table-button"
        aria-controls={open ? 'table-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <MoreVertIcon sx={{ fontSize: '1.25rem' }} />
      </IconButton>
      <Menu
        id="table-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'table-button',
        }}
        elevation={3}
      >
        <MenuItem
          sx={{
            fontSize: '0.875rem',
          }}
          onClick={handleClose}
        >
          View Details
        </MenuItem>
      </Menu>
    </div>
  );
}
