<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    //
    public function searchFriends(Request $request) {
        return Inertia::render("search_friends", [
            'searched' => User::with(['friend' => function($q) {
                $q->where("sender_id", auth()->id());
            }])->where("name", 'like', '%' . $request->name . '%')->get(),
            'search' => $request->name,
        ]);
    }
}
