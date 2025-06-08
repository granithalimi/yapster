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
        if($request->hasFile('image')){
            $path = $request->file("image")->store("images", "public");
            $profile = str_replace('images/', '', $path); 
            User::find(auth()->id())->update(['name' => $request->name, 'phone' =>  $request->phone,'profile' => $profile]);
        }else{
            User::find(auth()->id())->update(['name' => $request->name, 'phone' =>  $request->phone]);
        }
        return to_route("my_profile.edit");
    }
    public function editProfile(){
        $notifs = Friend::with("notifs")->where("receiver_id", auth()->id())->where("status", "pending")->get();
        return Inertia::render("edit_profile", [
            'notifs' => $notifs,
        ]);
    }
}
