import { useState } from 'react';
import {Link as RouterLink } from 'react-router-dom';
// material
import { Button } from '@mui/material';
// component
import ModifSeuilDialog from './ModifSeuilDialog';

// ----------------------------------------------------------------------

export default function ModificationSeuilCell({getCategories,idCat,seuilCategorie}) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
    <Button variant="contained" sx={{'&:hover': {color: '#fff',},}} component={RouterLink} to="#" onClick={handleClickOpen}>Modifier Seuil</Button>
    <ModifSeuilDialog getCategories={getCategories} open={open} setOpen={setOpen} idCat={idCat} seuilCategorie={seuilCategorie}/>
    </>
  );
}
