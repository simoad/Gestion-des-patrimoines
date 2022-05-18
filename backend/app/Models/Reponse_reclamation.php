<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reponse_reclamation extends Model
{
    protected $table = 'reponse_reclamation';
    const CREATED_AT = 'date_reponse';

    protected $fillable = [
        'id_reclamation',
        'id_service_recl',
        'ServiceResponce'
    ];

    public function reclamation()
    {
        return $this->BelongsTo(reclamation::class, 'id_reclamation', 'id_reclamation')->with('bien');
    }
}
