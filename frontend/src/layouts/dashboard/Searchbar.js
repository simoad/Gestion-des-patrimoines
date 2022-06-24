import { useState,useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

// material
import { styled, alpha } from '@mui/material/styles';
import { Input, Slide, Button, IconButton, InputAdornment, ClickAwayListener } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useFormik, Form, FormikProvider, Field } from 'formik';


// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------
const filter = createFilterOptions();

export default function Searchbar() {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [Biens, setBiens] = useState([]);
  const [value, setValue] = useState(null);

  const getBiens = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/bien');
    setBiens(res.data.biens);
   };

   useEffect(() => {
    getBiens();
    console.log(Biens);
   },[]);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      search : null,
    },
    onSubmit: async (values) => { navigate(`suiviBien/${values.search}`, { replace: true }) }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" width={20} height={20} />
          </IconButton>
        )}

        

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
          <Autocomplete
        freeSolo
        fullWidth
        id="free-solo-2-demo"
        disableClearable
        options={Biens.map((option) => `${option.code_barre} : ${option.nom}`)}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            {...getFieldProps('search')}
            label="Recherche"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    <Button type="submit" sx={{ ml: 4, py:1, px:3}} variant="contained" onClick={handleClose}>
              rechercher
            </Button>
            </SearchbarStyle>
        </Slide>
            </Form>
            </FormikProvider>
      </div>
    </ClickAwayListener>
  );
}
