<?php

namespace App\Models;

use App\Models\Yap;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    //
    protected $fillable = [
        "sender_id",
        "receiver_id",
    ];

    public function yaps(){
        return $this->hasMany(Yap::class, "convo_id", "id");
    }
}
