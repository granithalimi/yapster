<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Yap extends Model
{
    //
    protected $fillable = [
        "convo_id", 
        "message",
        "sender_id",
        "receiver_id",
    ];

    public function sender_user(){
        return $this->hasOne(User::class, "id", "sender_id");
    }

    public function receiver_user(){
        return $this->hasOne(User::class, "id", "receiver_id");
    }
}
