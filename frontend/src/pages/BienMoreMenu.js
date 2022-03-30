import { useRef, useState } from 'react';
import {useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../components/Iconify';

// ----------------------------------------------------------------------

export default function UserMoreMenu({codeBarre,getBiens}) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const deleteBien = async (id) => {
    const res = await axios.delete(`http://127.0.0.1:8000/api/delete-bien/${id}`);
    getBiens();
    console.log(res.data.result);
  };

  const editBien = async (id) => {
    const res = await axios.get(`http://127.0.0.1:8000/api/edit-bien/${id}`);
    navigate('/AddBien', { replace: true });
    console.log(res.data.bien[0].code_barre);
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
        <MenuItem component={RouterLink} to="#" sx={{ color: 'green' }}>
          <ListItemIcon>
            <Iconify icon="fluent:send-20-filled" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Affecter" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to={`/dashboard/editBien/${codeBarre}`} sx={{ color: 'text.primary' }}>
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
