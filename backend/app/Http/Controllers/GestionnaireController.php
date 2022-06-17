<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\Bureau;
use App\Models\Departement;
use Illuminate\Support\Facades\DB;



class GestionnaireController extends Controller
{
   

    function getAll(){

        // $employee = Employee::with('bureau')->get();
        $all_gestionnaire_info=DB::select("select id_gestionnaire, nom ,prenom,email from gestionnaire  where etat like 1 ORDER BY id_gestionnaire desc");

        return response()->json([
            'status'=> 200,
            'all_gestionnaire_info'=>$all_gestionnaire_info
            // 'bureau'=>$bureau,
            // 'departement'=>$departement
        ]);

    }
    function deletegestionnaire(Request $req){
     

       DB::update("update gestionnaire set etat=0 where id_gestionnaire=?",[$req->input('idfonctionnel')]);
      
        return response()->json([

            'status'=> 200
            
        ]);


    
      
    }


}