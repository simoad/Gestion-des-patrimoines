<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bureau;

class BureauController extends Controller
{

    function index(){
        $bureaux = Bureau::all();
        return response()->json([
            'status'=> 200,
            'bureau'=>$bureaux,
        ]);
    }

    function getByIdDepartement($id){
        $bureaux = Bureau::where('id_departement',$id)->get();
        return response()->json([
            'status'=> 200,
            'bureaux'=>$bureaux,
        ]);
    }
}
