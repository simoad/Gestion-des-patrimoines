<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;


class Employee extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'employe';
    protected $primaryKey = 'id_employe';
    public $timestamps = false;


    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password'
    ];
   
    protected $hidden = [
        'password',
        'remember_token',
    ];

   
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function bureau()
    {
        return $this->belongsTo(Bureau::class, 'id_bureau', 'id_bureau')->with(['affectations','departement']);
    }
}
