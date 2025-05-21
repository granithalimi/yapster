<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Yap extends Model
{
    //
    protected $fillable = [
        "sender_id",
        "receiver_id",
        "message",
    ];
}
