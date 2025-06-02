<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Friend;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    //
    public function searchFriends(Request $request) {
        $notifs = Friend::with("notifs")->where("receiver_id", auth()->id())->where("status", "pending")->get();
        return Inertia::render("search_friends", [
            'searched' => User::with(['friend' => function($q) {
                $q->where("sender_id", auth()->id());
            }])->where("name", 'like', '%' . $request->name . '%')->get(),
            'search' => $request->name,
            'notifs' => $notifs,
        ]);
    }
}
