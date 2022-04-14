<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Service_reclamation extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'service_reclamation';
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
}
