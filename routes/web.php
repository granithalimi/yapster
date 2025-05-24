<?php

use App\Models\User;
use Inertia\Inertia;
use App\Models\Friend;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\YapController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\NotifsController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\MyProfileController;

Route::get('/', function () {
    // return Inertia::render('welcome');
    return redirect()->route("yaps.index");
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource("yaps", YapController::class);
    Route::resource("friends", FriendController::class)->only(['index', 'destroy', 'store', 'update']);
    Route::get("search/{name}", [SearchController::class, 'searchFriends'])->name("searchFriends");
    Route::get("my_profile", [MyProfileController::class, 'myProfile'])->name("my_profile");
    Route::get("notifs", [NotifsController::class, "myNotifs"])->name("notifs");
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
