<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\Gestionnaire;
use App\Models\Service_reclamation;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function register(Request $req){
        if($req->input('role') === 'employee' ){
            $employee = new Employee();
            $employee->nom = $req->input('nom');
            $employee->prenom = $req->input('prenom');
            $employee->email = $req->input('email');
            $employee->password = Hash::make($req->input('password'));
            $employee->save();
            $token = $employee->createToken($employee->email.'_Token')->plainTextToken;
            return response()->json([
                'status'=> 200,
                'nom'=>$employee->nom,
                'message'=>'Employee Registered successfully'
            ]);
        }
        if($req->input('role') === 'gestionnaire' ){
            $gestionnaire = new Gestionnaire();
            $gestionnaire->nom = $req->input('nom');
            $gestionnaire->prenom = $req->input('prenom');
            $gestionnaire->email = $req->input('email');
            $gestionnaire->password = Hash::make($req->input('password'));
            $gestionnaire->save();
            $token = $gestionnaire->createToken($gestionnaire->email.'_Token')->plainTextToken;
            return response()->json([
                'status'=> 200,
                'nom'=>$gestionnaire->nom,
                'message'=>'gestionnaire Registered successfully'
            ]);
        }
        if($req->input('role') === 'service de reclamation' ){
            $service_de_reclamation = new Service_reclamation();
            $service_de_reclamation->nom = $req->input('nom');
            $service_de_reclamation->prenom = $req->input('prenom');
            $service_de_reclamation->email = $req->input('email');
            $service_de_reclamation->password = Hash::make($req->input('password'));
            $service_de_reclamation->save();
            $token = $service_de_reclamation->createToken($service_de_reclamation->email.'_Token')->plainTextToken;
            return response()->json([
                'status'=> 200,
                'nom'=>$service_de_reclamation->nom,
                'message'=>'service de reclamation Registered successfully'
            ]);
        }  
}

    function login(Request $req){
        if($req->input('role') === 'employee' ){
             $employee= Employee::where('email',$req->input('email'))->get();
           $req->session()->put('user' , $req->input('nom'));
        }
        if($req->input('role') === 'gestionnaire' ){
            $data= $req->input();
            echo json_encode($data);
            // $req->session()->put('email',$data['email']);
            // echo session('email');
        }
        if($req->input('role') === 'service de reclamation' ){
            $service_de_reclamation = new Service_reclamation();
           
            return $service_de_reclamation;
        }  
    }





}
