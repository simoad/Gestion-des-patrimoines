<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;
use App\Http\Controllers\BienController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AffectationController;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\BureauController;
use App\Http\Controllers\EmployeeController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Authentification Routes
Route::post('register','UserController@register');
Route::post('login','UserController@login');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout','UserController@logout');

    Route::get('chekingAuthenticated', function(){
        return response()->json([
            'message' => 'You are authenticated',
            'status' => 200
        ], 200);
    });

    // Bien Routes
    Route::get('bien', 'BienController@index')->name('bien');
    Route::post('add-bien', 'BienController@store');
    Route::delete('delete-bien/{id}', 'BienController@delete');
    Route::get('edit-bien/{id}', 'BienController@edit');
    Route::put('update-bien/{id}', 'BienController@update');
    Route::get('suivi-bien/{id}', 'BienController@suiviBien');

    //Affectation Routes
    Route::post('affect-bien', 'AffectationController@affect');

    //Departement Routes
    Route::get('get-departements', 'DepartementController@index')->name('get-departements');

    //Bureau Routes
    Route::get('get-bureaux/{id}', 'BureauController@getByIdDepartement');
    Route::get('get-bureaux', 'BureauController@index')->name('get-bureaux');

    //Employee Routes
    Route::get('get-employee/{id}', 'EmployeeController@getById');
    Route::post('reclamer', 'ReclamerController@ReclamerBien');

    // Categorie Routes
    Route::get('get-categories', 'CategorieController@index')->name('get-categories');
    Route::post('modifier-seuil/{id}', 'CategorieController@updateSeuil');
    Route::get('seuilCheck', 'CategorieController@seuilCheck');
    Route::get('get-seuil-notifications', 'CategorieController@getSeuilNotifications');

    //reclamation
    Route::get('getReclamationsNonRepondu', 'ReclamationController@get_all_reclamations_Non_Repondu')->name('getReclamationsNonRepondu');
    Route::get('getReclamationsRepondu', 'ReclamationController@get_all_reclamations_Repondu')->name('getReclamationsRepondu');
    Route::get('get_reclamateurs', 'ReclamationController@get_reclamateurs')->name('get_reclamateurs');
    Route::get('get_Biens', 'BienController@index')->name('get_Biens');
    Route::get('get_all_Responses_of_Reclamation', 'ReclamationController@get_all_Responses_of_Reclamation')->name('get_all_Responses_of_Reclamation');
    Route::post('responceReclamation', 'ReclamationController@responceReclamation');


    

});


