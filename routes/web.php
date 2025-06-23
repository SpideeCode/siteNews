<?php

use App\Models\Article;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;



Route::get('/', function () {
    $articles = Article::with(['category', 'tags', 'user', 'likes'])->get();
    return Inertia::render('welcome', [
        'articles' => $articles,
        'auth' => auth()->user(),
    ]);
})->name('home');




Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
