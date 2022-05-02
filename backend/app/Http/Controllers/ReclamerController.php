<?php

namespace App\Http\Controllers;

use App\Models\reclamation;
use Illuminate\Http\Request;

class ReclamerController extends Controller
{
    function  ReclamerBien(Request $req ){
        $reclamation = new reclamation();
        $reclamation->id_employe = $req->input('id_employe');
        $reclamation->code_barre = $req->input('code_barre');
        $reclamation->description = $req->input('description');
        $reclamation->status_reponce= $req->input('status');
        $reclamation->save();
        return response()->json([
          'status'=> 200,
          'reclamation'=>$reclamation,
      ]);
  }
  
}
