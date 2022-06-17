<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\Bureau;
use App\Models\Departement;
use Illuminate\Support\Facades\DB;



class EmployeeController extends Controller
{
    function getById($id){
        $employee = Employee::where('id_employe',$id)->with('bureau')->first();
        // $bureau = Bureau::where('id_bureau',$employee->id_bureau)->with('affectations')->with('departement')->first();
        // $departement = Departement::where('id_departement', $bureau->id_departement)->with('bureaux')->get();

        return response()->json([
            'status'=> 200,
            'employe'=>$employee,
            // 'bureau'=>$bureau,
            // 'departement'=>$departement
        ]);
    }

    function getAll(){

        // $employee = Employee::with('bureau')->get();
        $all_employe_info=DB::select("select e.id_employe, e.nom ,e.prenom,e.id_bureau,d.nom_departement from employe as e ,departement as d , bureau as b where b.id_departement =d.id_departement and e.id_bureau=b.id_bureau and e.etat like 1 ORDER BY e.id_employe desc ");

        return response()->json([
            'status'=> 200,
            'all_employe_info'=>$all_employe_info
            // 'bureau'=>$bureau,
            // 'departement'=>$departement
        ]);

    }
    function deleteemploye(Request $req){
     

       DB::update("update employe set etat=0 where id_employe=?",[$req->input('idfonctionnel')]);
       
        return response()->json([

            'status'=> 200,
            
        ]);


    
      
    }


}