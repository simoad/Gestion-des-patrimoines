<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Bien;
use Bureau;

class Affectation extends Model
{
    use HasFactory;

    protected $table = 'affectation';

    public function bien()
    {
        return $this->belongsTo(Bien::class);
    }

    public function bureau()
    {
        return $this->belongsTo(Bureau::class);
    }
}
