<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;


class Review extends Model
{
    use HasUuids;
    protected $fillable = ['assignment_id', 'reviewer_id', 'feedback', 'rating'];
    public $incrementing = false;
    protected $keyType = 'string';
}
