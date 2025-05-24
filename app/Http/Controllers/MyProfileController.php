<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Friend;
use Illuminate\Http\Request;

class MyProfileController extends Controller
{
    //
    public function myProfile() {
        return Inertia::render("my_profile", [
            'following' => Friend::where("sender_id", auth()->id())->count(),
            'followers' => Friend::with('users')->where("receiver_id", auth()->id())->where("status", "accepted")->count(), 
        ]);
    }
}
