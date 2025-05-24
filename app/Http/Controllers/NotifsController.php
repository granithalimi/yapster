<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Friend;
use Illuminate\Http\Request;

class NotifsController extends Controller
{
    //
    public function myNotifs(){
        $notifs = Friend::with("notifs")->where("receiver_id", auth()->id())->where("status", "pending")->get();
        return Inertia::render("my_notifs", [
            'notifs' => $notifs,
        ]);
    }
}
