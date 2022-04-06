import { useRef, useState } from 'react';
import {useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
// material
import { 
  Menu, MenuItem, IconButton, ListItemIcon, ListItemText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
 } from '@mui/material';
// component
import Iconify from '../components/Iconify';
import AffecterBienDialog from './AffecterBienDialog';

// ----------------------------------------------------------------------

export default function UserMoreMenu({codeBarre,getBiens}) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const deleteBien = async (id) => {
    const res = await axios.delete(`http://127.0.0.1:8000/api/delete-bien/${id}`);
    getBiens();
    console.log(res.data.result);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem component={RouterLink} to="#" sx={{ color: 'green' }} onClick={handleClickOpen}>
          <ListItemIcon>
            <Iconify icon="fluent:send-20-filled" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Affecter" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <AffecterBienDialog open={open} setOpen={setOpen} codeBarre={codeBarre}/>

        <MenuItem component={RouterLink} to={`/dashboard/editBien/${codeBarre}`} sx={{ color: '#0C53B7' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Modifier" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={() => deleteBien(codeBarre)}  sx={{ color: 'red' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" color="red" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Supprimer" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
