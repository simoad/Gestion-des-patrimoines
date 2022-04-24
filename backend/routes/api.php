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
});

// Bien Routes
Route::get('bien', 'BienController@index')->name('bien');
Route::post('add-bien', 'BienController@store');
Route::delete('delete-bien/{id}', 'BienController@delete');
Route::get('edit-bien/{id}', 'BienController@edit');
Route::put('update-bien/{id}', 'BienController@update');

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



