<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class demandeBien extends Model
{
    use HasFactory;
    protected $table = 'demande_bien';
    const CREATED_AT = 'date_demande';
}
