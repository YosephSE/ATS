import { useAppDispatch } from '@/redux/Hooks';
import { updateapplication } from '@/redux/slices/ApplicationSlice';
import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  value: string;
  id: string
}

const ButtonMenu = ({ value, id}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleStatusButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (newStatus?: string) => {
    setAnchorEl(null);
    if (newStatus) {
      onChange(newStatus); 
    }
  };

  const dispatch = useAppDispatch()

  const onChange = async(status: string) =>{
    dispatch(updateapplication({data: { status }, id: id}))
  }

  return (
    <div>
      <Button
        onClick={handleStatusButtonClick}
        variant="outlined"
        sx={{
          textTransform: 'none',
          borderRadius: '8px',
          width: '120px',
          padding: '8px 0',
          backgroundColor:
            value === 'pending'
              ? '#fff3cd'
              : value === 'rejected'
              ? '#f8d7da'
              : '#d4edda',
          color:
            value === 'pending'
              ? '#856404'
              : value === 'rejected'
              ? '#721c24'
              : '#155724',
          border: '1px solid',
          borderColor:
            value === 'pending'
              ? '#ffeeba'
              : value === 'rejected'
              ? '#f5c6cb'
              : '#c3e6cb',
        }}
      >
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleMenuClose()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {['pending', 'rejected', 'approved'].map((status) => (
          <MenuItem key={status} onClick={() => handleMenuClose(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ButtonMenu;
