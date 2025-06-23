<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ArticleController::class, 'index']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
