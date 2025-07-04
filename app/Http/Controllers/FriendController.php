<?php

namespace App\Http\Controllers;

use App\Events\NotifsEvent;
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
        $notifs = Friend::with("notifs")->where("receiver_id", auth()->id())->where("status", "pending")->get();
        return Inertia::render("friends", [
            'friends' => $my_friends,
            'notifs' => $notifs,
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
        $fq = Friend::create(['sender_id' => auth()->id(), 'receiver_id' => $request->id]);
        $notifs = Friend::with("notifs")->where("receiver_id", $request->id)->where("status", "pending")->get();
        broadcast(new NotifsEvent($notifs, $request->id));
        return redirect()->back();
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
        $notifs = Friend::with("notifs")->where("receiver_id", $friend->receiver_id)->where("status", "pending")->get();
        broadcast(new NotifsEvent($notifs, $friend->receiver_id));
        return redirect()->back();
    }
}
