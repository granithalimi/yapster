<?php

namespace App\Http\Controllers;

use App\Models\Yap;
use Inertia\Inertia;
use App\Models\Conversation;
use Illuminate\Http\Request;
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

        return Inertia::render("yaps", [
            "my_convos" => $my_convo,
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
