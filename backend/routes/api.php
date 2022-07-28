<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Authentification Routes
Route::post('register','UserController@register');
Route::post('login','UserController@login')->name('login');


Route::get('chekingAuthenticated', function(){
    return response()->json([
        'message' => 'You are authenticated',
        'status' => 200
    ], 200);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout','UserController@logout');

    //adminstructure
    Route::get('getstructure', 'DepartementController@getstructure')->name('getstructure');
    //admingestionnaire
    Route::get('get-allgestionnaire', 'GestionnaireController@getAll')->name('get-allgestionnaire');
    Route::post('deletegestionnaire', 'GestionnaireController@deletegestionnaire')->name('deletegestionnaire');

    //adminservice
    Route::get('get-allservice', 'ServiceControllers@getAll')->name('get-allservice');
    Route::post('deleteservicerecl', 'ServiceControllers@deleteservicerecl')->name('deleteservicerecl');

    //adminemploye
    Route::get('get-allemployee', 'EmployeeController@getAll')->name('get-allemployee');
    Route::post('deleteemploye', 'EmployeeController@deleteemploye')->name('deleteemploye');

    
    // Bien Routes
    Route::get('bien', 'BienController@index')->name('bien');
    Route::post('add-bien', 'BienController@store');
    Route::delete('delete-bien/{id}', 'BienController@delete');
    Route::get('edit-bien/{id}', 'BienController@edit');
    Route::put('update-bien/{id}', 'BienController@update');
    Route::get('suivi-bien/{id}', 'BienController@suiviBien');
    Route::get('bien-au-rebut', 'BienController@getBienAEnvoyerRebut');
    Route::post('envoyer-au-rebut', 'BienController@EnvoyezAuRebut');


    // Notification 
    Route::post('marqueAsRead/{id}', 'CategorieController@marqueAsRead');
    Route::get('seuilCheck', 'CategorieController@seuilCheck');
    Route::get('get-seuil-notifications', 'CategorieController@getSeuilNotifications');

    //Affectation Routes
    Route::post('affect-bien', 'AffectationController@affect');

    //Departement Routes
    Route::get('get-departements', 'DepartementController@index')->name('get-departements');
    Route::post('registerdepartement', 'DepartementController@registerdepartement')->name('registerdepartement');

    //Bureau Routes
    Route::get('get-bureaux/{id}', 'BureauController@getByIdDepartement');
    Route::get('get-bureaux', 'BureauController@index')->name('get-bureaux');

    Route::post('registerbureau', 'BureauController@registerbureau')->name('registerbureau');


    //Employee Routes
    Route::get('get-employees', 'EmployeeController@getEmployees');
    Route::get('get-employee/{id}', 'EmployeeController@getById');
    Route::get('get_reclamation/{id}', 'EmployeeController@getReclamation');
    Route::post('reclamer', 'ReclamerController@ReclamerBien');

    //Service-Reclamation
    Route::get('get-services-reclamation', 'ReclamerController@getServices');


    //Demandes des biens
    Route::post('add-demande/{id}','DemandeBienContoller@store');
    Route::get('get-demande-bien/{id}', 'DemandeBienContoller@getById');
    Route::get('get-demandes', 'DemandeBienContoller@getDemandes');
    Route::post('confirmer-consulter-demande', 'DemandeBienContoller@confirmerConsulterDemande');

    // Categorie Routes
    Route::get('get-categories', 'CategorieController@index')->name('get-categories');
    Route::post('modifier-seuil/{id}', 'CategorieController@updateSeuil');
    Route::post('ajout-categorie', 'CategorieController@store');

   


    //reclamation
    Route::get('getReclamationsNonRepondu', 'ReclamationController@get_all_reclamations_Non_Repondu')->name('getReclamationsNonRepondu');
    Route::get('getReclamationsRepondu/{id}', 'ReclamationController@get_all_reclamations_Repondu')->name('getReclamationsRepondu');
    Route::get('get_reclamateurs', 'ReclamationController@get_reclamateurs')->name('get_reclamateurs');
    Route::get('get_Biens', 'BienController@index')->name('get_Biens');
    Route::get('get_all_Responses_of_Reclamation', 'ReclamationController@get_all_Responses_of_Reclamation')->name('get_all_Responses_of_Reclamation');
    Route::post('responceReclamation', 'ReclamationController@responceReclamation')->name('responceReclamation');
    Route::get('get_all_biens_En_Rebut/{id}', 'ReclamationController@get_all_biens_En_Rebut')->name('get_all_biens_En_Rebut');
    Route::get('get_all_biens_En_Reparation/{id}', 'ReclamationController@get_all_biens_En_Reparation')->name('get_all_biens_En_Reparation');

    //Historique 
    Route::get('addBien/{idGest}/{codeBarre}', 'HistoriqueController@AddBien');
    Route::get('updateBien/{idGest}/{codeBarre}', 'HistoriqueController@UpdateBien');
    Route::get('rebutBien/{idGest}/{codeBarre}', 'HistoriqueController@RebutBien');
    Route::get('affectationBien/{idGest}/{codeBarre}/{idBureau}/{idDepartement}', 'HistoriqueController@AddBien');
    Route::get('reclamation/{idEmpl}/{codeBarre}', 'HistoriqueController@Reclamation');
    Route::get('reponseReclamation/{idservice}/{codeBarre}', 'HistoriqueController@ReponseReclamation');
    Route::get('adminHistory', 'HistoriqueController@getAdminHistory');
    Route::get('gestionnaireHistory', 'HistoriqueController@getGestionnaireHistory');
    Route::get('gestionnaireHistoryRebut', 'HistoriqueController@getGestionnaireHistoryRebut');
    Route::get('gestionnaireHistoryAjout', 'HistoriqueController@getGestionnaireHistoryAjout');
    Route::get('gestionnaireHistoryAffectation', 'HistoriqueController@getGestionnaireHistoryAffectation');
    Route::get('gestionnaireHistoryModification', 'HistoriqueController@getGestionnaireHistoryModification');
    Route::get('gestionnaireHistoryReclamation', 'HistoriqueController@getGestionnaireHistoryReclamation')->name('gestionnaireHistoryReclamation');
    Route::get('gestionnaireHistoryForAdmin', 'HistoriqueController@getGestionnaireHistoryForAdmin');


});


