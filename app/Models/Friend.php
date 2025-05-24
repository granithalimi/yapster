<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Friend extends Model
{
    //
    protected $fillable = [
        "sender_id",
        "receiver_id",
        "status",
    ];
    public function users() {
        return $this->hasOne(User::class, "id", "receiver_id");
    }
    public function notifs() {
        return $this->hasOne(User::class, "id", "sender_id");
    }
}
