<?php

use App\Models\Article;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;

use App\Http\Middleware\AdminPass;
use App\Http\Middleware\WebmasterPass;
use App\Http\Middleware\AuteurPass;
use App\Http\Middleware\LecteurPass;

Route::get('/', function () {
    $articles = Article::with(['category', 'tags', 'user', 'likes', 'latestComment.user'])->get();

    return Inertia::render('welcome', [
        'articles' => $articles,
        'auth' => auth()->user(),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

// Routes accessibles à Lecteur, Auteur, Webmaster, Admin
Route::middleware(['auth', LecteurPass::class])->group(function () {
    Route::post('/comments', [CommentController::class, 'store']);
    Route::post('/likes', [LikeController::class, 'store']);
    Route::delete('/likes/{id}', [LikeController::class, 'destroy']);
});

// Routes accessibles à Auteur, Webmaster, Admin
Route::middleware(['auth', AuteurPass::class])->group(function () {
    Route::get('/articles/create', [ArticleController::class, 'create'])->name('articles.create');
    Route::post('/articles', [ArticleController::class, 'store']);
    Route::get('/articles/{article}/edit', [ArticleController::class, 'edit'])->name('articles.edit');
    Route::put('/articles/{article}', [ArticleController::class, 'update']);
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy']);
    Route::get('/mes-articles', [ArticleController::class, 'myArticles'])->name('auteur.articles');
});

// Routes accessibles à Webmaster, Admin
Route::middleware(['auth', WebmasterPass::class])->group(function () {
    Route::resource('/categories', CategoryController::class)->except(['show']);
    Route::resource('/tags', TagController::class)->except(['show']);
});

// Routes accessibles uniquement à Admin
Route::middleware(['auth', AdminPass::class])->group(function () {
    Route::get('/admin/users', fn () => Inertia::render('Admin/Users'));
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
