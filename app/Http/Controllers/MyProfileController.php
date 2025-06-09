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
    public function otherProfile(Request $request) {
        $notifs = Friend::with("notifs")->where("receiver_id", auth()->id())->where("status", "pending")->get();
        $other_user = User::find($request->id);
        $status = Friend::where(function($q) use ($other_user) {
            $q->where("sender_id", auth()->id())->where("receiver_id", $other_user->id);
        })->orWhere(function($q) use ($other_user) {
            $q->where("sender_id", $other_user->id)->where("receiver_id", auth()->id());
        })->get();

        return Inertia::render("other_profile", [
            'following' => Friend::with('users')->where("sender_id", $other_user->id)->get(),
            'followers' => Friend::with('notifs')->where("receiver_id", $other_user->id)->where("status", "accepted")->get(), 
            'notifs' => $notifs,
            'user' => $other_user,
            'status' => $status,
        ]);
    }
    public function updateProfile(Request $request){
        if($request->remove){
            User::find(auth()->id())->update(['name' => $request->name, 'phone' =>  $request->phone, 'profile' => "default.png"]);
            return to_route("my_profile.edit");
        }

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
