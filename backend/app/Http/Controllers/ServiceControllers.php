<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\Bureau;
use App\Models\Departement;
use Illuminate\Support\Facades\DB;



class ServiceControllers extends Controller
{
   

    function getAll(){

        // $employee = Employee::with('bureau')->get();
        $all_service_reclamation_info=DB::select("select id_service_recl, nom ,prenom,email from service_reclamation  where etat like 1 ORDER BY id_service_recl desc");

        return response()->json([
            'status'=> 200,
            'all_service_reclamation_info'=>$all_service_reclamation_info
            // 'bureau'=>$bureau,
            // 'departement'=>$departement
        ]);

    }
    function deleteservicerecl(Request $req){
     

       DB::update("update service_reclamation set etat=0 where id_service_recl=?",[$req->input('idfonctionnel')]);
      
        return response()->json([

            'status'=> 200
            
        ]);


    
      
    }


}