<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Friend;
use Illuminate\Http\Request;

class MyProfileController extends Controller
{
    //
    public function myProfile() {
        $notifs = Friend::with("notifs")->where("receiver_id", auth()->id())->where("status", "pending")->get();
        return Inertia::render("my_profile", [
            'following' => Friend::with('users')->where("sender_id", auth()->id())->get(),
            'followers' => Friend::with('notifs')->where("receiver_id", auth()->id())->where("status", "accepted")->get(), 
            'notifs' => $notifs,
        ]);
    }
    public function updateProfile(Request $request){
        $request->validate([
            "image" => "required|image"
        ]);
        if($request->hasFile('image')){
            $path = $request->file("image")->store("images", "public");
        }
        $profile = str_replace('images/', '', $path); 
        User::find(auth()->id())->update(['profile' => $profile]);
        return redirect()->back();
    }
}
