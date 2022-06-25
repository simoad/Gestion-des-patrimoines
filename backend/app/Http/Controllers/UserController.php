<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\Admin;
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
            $employee->id_bureau = $req->input('id_bureau');
            $employee->etat = 1;
            $employee->password = Hash::make($req->input('password'));
            
            $employee->save();
            $token = $employee->createToken($employee->email.'_Token')->plainTextToken;
            return response()->json([
                'status'=> 200,
                'nom'=>$employee->nom,
                'token'=>$token,
                'message'=>'Employee Registered successfully'
            ]);
        }
        if($req->input('role') === 'gestionnaire' ){
            $gestionnaire = new Gestionnaire();
            $gestionnaire->nom = $req->input('nom');
            $gestionnaire->prenom = $req->input('prenom');
            $gestionnaire->email = $req->input('email');
            $gestionnaire->etat =1;
            $gestionnaire->password = Hash::make($req->input('password'));
            $gestionnaire->save();
            $token = $gestionnaire->createToken($gestionnaire->email.'_Token')->plainTextToken;
            return response()->json([
                'status'=> 200,
                'nom'=>$gestionnaire->nom,
                'token'=>$token,
                'message'=>'gestionnaire Registered successfully'
            ]);
        }
        if($req->input('role') === 'service_de_reclamation' ){
            $service_de_reclamation = new Service_reclamation();
            $service_de_reclamation->nom = $req->input('nom');
            $service_de_reclamation->prenom = $req->input('prenom');
            $service_de_reclamation->email = $req->input('email');
            $service_de_reclamation->etat = 1;
            $service_de_reclamation->password = Hash::make($req->input('password'));
            $service_de_reclamation->save();
            $token = $service_de_reclamation->createToken($service_de_reclamation->email.'_Token')->plainTextToken;
            return response()->json([
                'status'=> 200,
                'nom'=>$service_de_reclamation->nom,
                'token'=>$token,
                'message'=>'service de reclamation Registered successfully'
            ]);
        }  
    }

    function login(Request $req){

        //Employee
        if($req->input('role') === 'employee' ){
            $employee= Employee::where('email',$req->input('email'))->first();
            if(!$employee || ! Hash::check($req->password, $employee->password))
            {
                return response()->json([
                    'status'=> 401,
                    'message'=>'Invalid Credentials'
                ]);
            } 
            else 
            {
                $token = $employee->createToken($employee->email.'_Token')->plainTextToken;
                return response()->json([
                    'status'=> 200,
                    'employee'=>$employee,
                    'nom'=>$employee->nom,
                    'token'=>$token,
                    'message'=>'Employee Logged In successfully'
                ]);
            }
        }

        // Gestionnaire
        if($req->input('role') === 'gestionnaire' ){
            $gestionnaire= Gestionnaire::where('email',$req->input('email'))->first();
           
            if(!$gestionnaire )
            //|| ! Hash::check($req->password, $gestionnaire->password)
            {
                return response()->json([
                    'status'=> 401,
                    'message'=>'Invalid Credentials'
                ]);
            } 
            else 
            {
                $token = $gestionnaire->createToken($gestionnaire->email.'_Token')->plainTextToken;
                return response()->json([
                    'status'=> 200,
                    'gestionnaire'=>$gestionnaire,
                    'nom'=>$gestionnaire->nom,
                    'token'=>$token,
                    'message'=>'gestionnaire Logged In successfully'
                ]);
            }
        }

        // Service Reclamation
        if($req->input('role') === 'service_de_reclamation' ){
            $service_reclamation= Service_reclamation::where('email',$req->input('email'))->first();
            if(!$service_reclamation || ! Hash::check($req->password, $service_reclamation->password))
            {
                return response()->json([
                    'status'=> 401,
                    'message'=>'Invalid Credentials'
                ]);
            } 
            else 
            {
                $token = $service_reclamation->createToken($service_reclamation->email.'_Token')->plainTextToken;
                return response()->json([
                    'status'=> 200,
                    'service_de_reclamation'=>$service_reclamation,
                    'nom'=>$service_reclamation->nom,
                    'token'=>$token,
                    'message'=>'service_reclamation Logged In successfully'
                ]);
            }
        }  
        if($req->input('role') === 'admin' ){
            $admin=Admin::where('email',$req->input('email'))->first();

            if(!$admin )
            //|| ! Hash::check($req->password, $admin->password)
            {
                
                return response()->json([
                    'status'=> 401,
                    'message'=>'Invalid Credentials'
                ]);
            } 
            else 
            {
                $token = $admin->createToken($admin->email.'_Token')->plainTextToken;
                return response()->json([
                    'status'=> 200,
                    'admin'=>$admin,
                    'nom'=>$admin->nom,
                    'token'=>$token,
                    'message'=>'admin Logged In successfully'
                ]);
            }
        }  
    }

    function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status'=> 200,
            'message'=>'Logged Out successfully'
        ]);
    }

}

