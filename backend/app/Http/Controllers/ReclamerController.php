<?php

namespace App\Http\Controllers;

use App\Models\reclamation;
use Illuminate\Http\Request;

class ReclamerController extends Controller
{
    function  reclamerBien(Request $req){
        $reclamation = new reclamation();
        $reclamation->id_employe = $req->input('id_employe');
        $reclamation->code_barre = $req->input('code_barre');
        $reclamation->description = $req->input('description');
        $reclamation->save();
        return $reclamation;
  }
  
}
