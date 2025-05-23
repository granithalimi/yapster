<?php

use App\Models\User;
use Inertia\Inertia;
use App\Models\Friend;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\YapController;
use App\Http\Controllers\FriendController;

Route::get('/', function () {
    // return Inertia::render('welcome');
    return redirect()->route("dashboard");
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource("yaps", YapController::class)->only([
        'index'
    ]);
    // Route::get("friends", function () {
    //     return Inertia::render("friends");
    // })->name("friends");

    Route::resource("friends", FriendController::class)->only(['index']);
    Route::get("my_profile", function () {
        return Inertia::render("my_profile", [
            'following' => Friend::where("sender_id", auth()->id())->count(),
            'followers' => Friend::with('users')->where("sender_id", auth()->id())->where("status", "accepted")->count(), 
        ]);
    })->name('my_profile');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
