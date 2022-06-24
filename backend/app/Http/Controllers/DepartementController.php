<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Departement;
use Illuminate\Support\Facades\DB;

class DepartementController extends Controller
{
    function index(){
        $departements = Departement::all();
        return response()->json([
            'status'=> 200,
            'departements'=>$departements,
        ]);
    }

    function getstructure(){

        // $employee = Employee::with('bureau')->get();
        $structure=DB::select("select d.nom_departement , b.id_bureau from departement as d , bureau as b where b.id_departement like d.id_departement order by d.nom_departement asc ");

        return response()->json([
            'status'=> 200,
            'structure'=>$structure
            // 'bureau'=>$bureau,
            // 'departement'=>$departement
        ]);

    }
    function registerdepartement(Request $req){


        $condition=DB::select("select nom_departement   from departement where nom_departement like (?)" ,[$req->input('departement')]);

       
        
        

        if(!$condition ){
        $test = DB::insert("insert into departement (`nom_departement`) VALUES (?)" ,[$req->input('departement')]);
        
        return response()->json([
            'status'=> 200,
           
        
        ]);

        
    
    
    }
    else{
        return response()->json([
            'status'=> 400,
           
        
        ]);

    }
    
   
       
}




}
