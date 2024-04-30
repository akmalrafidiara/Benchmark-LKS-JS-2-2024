<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;

    protected $table = 'driver';
    protected $primaryKey = 'driver_id';
    protected $guarded = [];
    public $incrementing = false;

    public function corridor()
    {
        return $this->hasMany(Corridor::class);
    }
}