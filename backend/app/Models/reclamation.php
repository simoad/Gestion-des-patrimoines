<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class reclamation extends Model
{
    protected $table = 'reclamation';
    const CREATED_AT = 'date_reclamation';

    protected $fillable = [
        'id_reclamation',
        'id_employe',
        'code_barre',
        'description',
        'date_reclamation'
    ];
}
