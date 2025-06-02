<?php

namespace App\Http\Controllers;

use App\Models\Yap;
use Inertia\Inertia;
use App\Models\Friend;
use App\Events\MessageEvent;
use App\Events\NotifsEvent;
use App\Models\Conversation;
use Illuminate\Http\Request;
use League\Uri\IPv4\Converter;
use App\Http\Controllers\Controller;

class YapController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $my_convo = Conversation::with(['yaps' => function ($q) {
            $q->with(["receiver_user", "sender_user"])->orderBy('created_at', 'desc');
        }])
        ->where("sender_id", auth()->id())
        ->orWhere('receiver_id', auth()->id())
        ->get();

        $notifs = Friend::with("notifs")->where("receiver_id", auth()->id())->where("status", "pending")->get();
        return Inertia::render("yaps", [
            "my_convos" => $my_convo,
            "notifs" => $notifs,
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
        $userId = auth()->id();
        $otherUserId = $request->receiverId;

        $conversation = Conversation::where(function ($query) use ($userId, $otherUserId) {
        $query->where('sender_id', $userId)
              ->where('receiver_id', $otherUserId);
    })->orWhere(function ($query) use ($userId, $otherUserId) {
        $query->where('sender_id', $otherUserId)
              ->where('receiver_id', $userId);
    })->first();

        if($conversation){
            Yap::create(['sender_id' => auth()->id(), 'receiver_id' => $request->receiverId, 'convo_id' => $conversation->id, 'message' => $request->message]);
            broadcast(new MessageEvent($request->message, $request->receiverId));
            return redirect()->back();
        }else{
            Conversation::create(['receiver_id' => $request->receiverId, 'sender_id' => auth()->id()]);
            broadcast(new MessageEvent($request->message, $request->receiverId));
            Yap::create(['sender_id' => auth()->id(), 'receiver_id' => $request->receiverId, 'convo_id' => Conversation::orderBy("id", "desc")->first()->id, 'message' => $request->message]);
            return redirect()->back();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Yap $yap)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Yap $yap)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Yap $yap)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Yap $yap)
    {
        //
    }
}
