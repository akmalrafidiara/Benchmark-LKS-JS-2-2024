<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Corridor extends Model
{
    use HasFactory;

    protected $table = 'corridor';
    protected $guarded = [];

    public function bus()
    {
        return $this->belongsTo(Bus::class);
    }

    public function driver()
    {
        return $this->belongsTo(Driver::class, 'driver_id', 'driver_id');
    }
}