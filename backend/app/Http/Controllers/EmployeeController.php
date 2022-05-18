<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\Bureau;
use App\Models\Departement;



class EmployeeController extends Controller
{
    function getEmployees(){
        $employees = Employee::all();
        
        return response()->json([
            'status'=> 200,
            'employees'=>$employees,
        ]);
    }

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
}
