<?php

use App\Http\Controllers\YapController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    Route::get("friends", function () {
        return Inertia::render("friends");
    })->name("friends");
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
