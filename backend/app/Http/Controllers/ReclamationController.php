<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Reclamation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Reponse_reclamation;

class ReclamationController extends Controller
{
    function get_all_reclamations_Non_Repondu(){
        $reclamations = Reclamation::where('status_reponce' , -1)->get();

        

        return response()->json([
            'status'=> 200,
            'reclamations'=>$reclamations
        ]);
    }
    function get_all_reclamations_Repondu(){
        // $reclamations = Reclamation::where('status_reponce' , 1)->get();
        $result=DB::select("select E.nom as employe,R.id_reclamation , B.nom as produit , R.description , R.date_reclamation , R.code_barre , Res.ServiceResponce  
        from reclamation as R ,  bien as B , employe as E  , reponse_reclamation as Res
        where B.code_barre=R.code_barre
        and E.id_employe= R.id_employe
        and Res.id_reclamation=R.id_reclamation
        and Res.id_service_recl=9 
        and R.status_reponce=1;");

        return response()->json([
            'status'=> 200,
            'reclamations'=>$result
        ]);
    }
    function get_reclamateurs(){
        $reclamateurs = Employee::all();

        return response()->json([
            'status'=> 200,
            'reclamateurs'=>$reclamateurs
        ]);
    }
    
    function  responceReclamation(Request $req ){
        $test=DB::select(" select id_reclamation from reclamation where code_barre=? and status_reponce=1 order by date_reclamation desc LIMIT 1;",[$req->input('codeBarre')]);
       if(!empty($test) ){
        $result=DB::select("select ServiceResponce from reponse_reclamation where id_reclamation=?;",[$test[0]->id_reclamation] );
        };
        
           
            if(empty($result) || empty($test)  || array_column($result , 'ServiceResponce')[0] == "En Reparation"   ){
                Reclamation::where('id_reclamation',$req->input('idReclamation'))->update(['status_reponce' => 1]);
                if($req->input('ServiceReponse') == "En Rebut"){
                    DB::delete("delete from affectation where code_barre=?",[$req->input('codeBarre')]);
                    //il faut envoyer une notification à l'employe est l'informer que le bien il est dans le Rebut
                }
                $response = new Reponse_reclamation();
                $response->id_reclamation = $req->input('idReclamation');
                $response->id_service_recl = $req->input('idServiceReclamation');
                $response->ServiceResponce= $req->input('ServiceReponse');
                $response->save();
                return response()->json([
                    'status'=> 200,
                    'response'=>$response
                ]);
                
            }
            elseif(array_column($result , 'ServiceResponce')[0] == "En Rebut" ){
                Reclamation::where('id_reclamation',$req->input('idReclamation'))->update(['status_reponce' => 0]);
                return response()->json([
                    'status'=> 400,
                    'message'=>'impossible deja en Rebut'
                ]);
            } else {
                return response()->json([
                    'status'=> 404
                ]);
            }
            
            
      }
      function get_all_Responses_of_Reclamation(){
        $Responses = Reponse_reclamation::all();

        return response()->json([
            'status'=> 200,
            'Responses'=>$Responses
        ]);
    }
    


}
