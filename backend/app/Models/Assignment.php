<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Assignment extends Model
{
    use HasUuids;
    protected $fillable = ['user_id', 'title', 'file_path'];
    public $incrementing = false;
    protected $keyType = 'string';

    
}
