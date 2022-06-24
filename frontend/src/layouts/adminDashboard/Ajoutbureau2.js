import { useState } from 'react';
import {Link as RouterLink } from 'react-router-dom';
// material
import { Button } from '@mui/material';

// component
import Iconify from '../../components/Iconify';
import Ajoutbureaudialog from './AjoutBureauDialog';

// ----------------------------------------------------------------------

export default function Ajoutbureau2() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
    <Button  variant="contained"  sx={{ml:5}} component={RouterLink} to="#" onClick={handleClickOpen} startIcon={<Iconify icon="eva:plus-fill" />}>Ajout Bureau</Button>
    <Ajoutbureaudialog  open={open} setOpen={setOpen}  />
    </>
  );
}
