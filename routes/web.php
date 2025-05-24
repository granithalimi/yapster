<?php

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Friend;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\YapController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\MyProfileController;
use App\Http\Controllers\SearchController;

Route::get('/', function () {
    // return Inertia::render('welcome');
    return redirect()->route("dashboard");
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource("yaps", YapController::class)->only(['index']);
    Route::resource("friends", FriendController::class)->only(['index', 'destroy', 'store']);
    Route::get("search/{name}", [SearchController::class, 'searchFriends'])->name("searchFriends");
    Route::get("my_profile", [MyProfileController::class, 'myProfile'])->name("my_profile");
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
