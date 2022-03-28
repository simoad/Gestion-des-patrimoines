import { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';


export default function AddBien() {

  const [bien, setbien]= useState({
    code_barre : 1,
    id_categorie : 1,
    nom : 'test',
    garantie : 0,
    duree_de_vie : 0,
    status : 0
  });

  const ajouterBien = async (e) => {
    e.preventDefault();
  
    const res = await axios.post('http://localhost:8000/api/add-bien', bien);

    if (res.data.status === 200)
    {
      console.log(res.data.message);
      setbien({
        code_barre : 0,
        id_categorie : 0,
        nom : '',
        garantie : 0,
        duree_de_vie : 0,
        status : 0
      });
    }
  }

  
const handleInput = (e) =>{
  setbien({
    [e.target.name] : e.target.value
  });
}

  return (
    <div className='container'>
      <h1 className="fs-3 mb-5">Ajouter un bien</h1>
      <form onSubmit={ajouterBien}>
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="form-outline">
              <label className="form-label">Code Barre</label>
              <input type="text" name="code_barre" onChange={handleInput} className="form-control mb-3"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-outline">
              <label className="form-label">Nom Bien</label>
              <input type="text" name="nom_bien" onChange={handleInput} className="form-control mb-3"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-outline">
              <label className="form-label">Categorie</label>
              <input type="text" name="id_categorie" onChange={handleInput} className="form-control mb-3"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-outline">
              <label className="form-label">garantie</label>
              <input type="text" name="garantie" onChange={handleInput} className="form-control mb-3"/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-outline">
              <label className="form-label">Durée de vie</label>
              <input type="text" name="duree_de_vie" onChange={handleInput} className="form-control mb-3"/>
            </div>
          </div>
        </div>
        <button 
        type="submit" 
        className="btn btn-primary btn-block mb-4">
        Ajouter
        </button>
      </form>
    </div>
  );
}
