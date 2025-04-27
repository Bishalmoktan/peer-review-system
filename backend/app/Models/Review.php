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

    public function assignment()
{
    return $this->belongsTo(Assignment::class, 'assignment_id', 'id');
}

public function reviewer()
{
    return $this->belongsTo(User::class, 'reviewer_id', 'id');
}   
}
