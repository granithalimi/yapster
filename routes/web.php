<?php

use App\Models\Yap;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\YapController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\NotifsController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\MyProfileController;
use App\Models\Conversation;

Route::get('/', function () {
    // return Inertia::render('welcome');
    return redirect()->route("yaps.index");
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource("yaps", YapController::class)->only(['index']);
    Route::resource("friends", FriendController::class)->only(['index', 'destroy', 'store', 'update']);

    Route::get("yaps/{id}", function(Request $request) {
        $user1 = auth()->id();
        $user2 = $request->id;

        $yaps = Conversation::with('yaps')->where(function($q) use ($user1, $user2) {
            $q->where('sender_id', $user1)->where('receiver_id', $user2);
        })->orWhere(function($q) use ($user1, $user2) {
            $q->where('sender_id', $user2)->where('receiver_id', $user1);
        })->get();

        return Inertia::render("yap", [
            'yaps' => $yaps,
            "user" => User::find($request->id),
        ]);
    })->name("yaps.show");

    Route::get("search/{name}", [SearchController::class, 'searchFriends'])->name("searchFriends");
    Route::get("my_profile", [MyProfileController::class, 'myProfile'])->name("my_profile");
    Route::get("notifs", [NotifsController::class, "myNotifs"])->name("notifs");
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
