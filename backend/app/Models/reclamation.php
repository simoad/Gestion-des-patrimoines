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
        'date_reclamation',
        'status_reponce'
    ];

    public function reponse_reclamation()
    {
        return $this->HasMany(Reponse_reclamation::class, 'id_reclamation', 'id_reclamation');
    }

    public function bien()
    {
        return $this->belongsTo(Bien::class, 'code_barre', 'code_barre');
    }
}
