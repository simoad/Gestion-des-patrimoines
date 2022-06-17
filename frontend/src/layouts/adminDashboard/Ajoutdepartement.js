import { useState } from 'react';
import {Link as RouterLink } from 'react-router-dom';
// material
import { Button } from '@mui/material';

// component
import Iconify from '../../components/Iconify';
import Ajoutdepartementdialog from './AjoutDepartementDialog';

// ----------------------------------------------------------------------

export default function Ajoutdepartement() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
    <Button  variant="contained" component={RouterLink} to="#" onClick={handleClickOpen} startIcon={<Iconify icon="eva:plus-fill" />}>Ajout departement</Button>
    <Ajoutdepartementdialog  open={open} setOpen={setOpen}  />
    </>
  );
}
