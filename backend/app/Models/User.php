<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable,HasUuids, HasApiTokens;

    protected $fillable = ['name', 'email', 'password', 'role'];
    public $incrementing = false;
    protected $keyType = 'string';
}
