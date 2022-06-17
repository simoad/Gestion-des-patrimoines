<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bureau;
use Illuminate\Support\Facades\DB;

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


    function registerbureau(Request $req){
        $test = DB::insert("insert into bureau (`id_bureau`, `id_departement`) VALUES (?,?)" ,[$req->input('numerob'), $req->input('numerod')]);
        
       

        return response()->json([
            'status'=> 200,
           
            // 'bureau'=>$bureau,
            // 'departement'=>$departement
        ]);
       
}
}