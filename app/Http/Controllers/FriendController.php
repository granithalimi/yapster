<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Friend;
use Illuminate\Http\Request;

class FriendController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $my_friends = Friend::with('users')->where("sender_id", auth()->id())->where("status", "accepted")->get();
        return Inertia::render("friends", [
            'friends' => $my_friends,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        Friend::create(['sender_id' => auth()->id(), 'receiver_id' => $request->id]);
        return to_route("friends.index");
        // return dd($request->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Friend $friend)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Friend $friend)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Friend $friend)
    {
        //
        // return dd($request->status);
        Friend::find($friend->id)->update(['status' => $request->status]);
        return to_route("notifs");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Friend $friend)
    {
        //
        Friend::where("id", $friend->id)->first()->delete();
        return to_route("friends.index");
    }
}
