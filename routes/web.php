<?php

use App\Models\User;
use App\Models\Article;
use App\Models\Comment;
use App\Models\Category;
use App\Models\Tag;
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

use Illuminate\Http\Request;

Route::get('/', function () {
    $articles = Article::with(['category', 'tags', 'user', 'likes', 'latestComment.user'])->get();

    return Inertia::render('welcome', [
        'articles' => $articles,
        'auth' => auth()->user() ? [
            'id' => auth()->id(),
            'name' => auth()->user()->name,
            'role' => auth()->user()->role,
        ] : null,
    ]);
})->name('home');


Route::middleware(['auth', 'verified'])->get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

// Routes accessibles à Lecteur, Auteur, Webmaster, Admin
Route::middleware(['auth', LecteurPass::class])->group(function () {
    Route::post('/comments', [CommentController::class, 'store']);
    Route::post('/likes', [LikeController::class, 'store']);
    Route::delete('/likes/{like}', [LikeController::class, 'destroy']);
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


    Route::get('/webmaster/manage', function () {
        $categories = Category::all();
        $tags = Tag::all();
        return Inertia::render('WebmasterManage', [
            'categories' => $categories,
            'tags' => $tags,
        ]);
    })->name('webmaster.manage');
});

// Routes accessibles uniquement à Admin
Route::middleware(['auth', AdminPass::class])->group(function () {

    Route::get('/admin/dashboard', function () {
        return Inertia::render('AdminDashboard', [
            'stats' => [
                'users' => User::count(),
                'articles' => Article::count(),
                'comments' => Comment::count(),
                'categories' => Category::count(),
                'tags' => Tag::count(),
            ]
        ]);
    })->name('admin.dashboard');

    Route::get('/users', function () {
        return Inertia::render('Users', [
            'users' => User::all(),
        ]);
    })->name('users.index');

    

Route::post('/users', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|string|min:6',
        'role' => 'required|in:lecteur,auteur,webmaster,admin',
    ]);

    \App\Models\User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => \Illuminate\Support\Facades\Hash::make($validated['password']),
        'role' => $validated['role'],
    ]);

    return redirect()->back();
})->middleware(['auth', \App\Http\Middleware\AdminPass::class]);


    Route::post('/users/{user}/update-role', function (Request $request, User $user) {
        $request->validate([
            'role' => 'required|in:lecteur,auteur,webmaster,admin',
        ]);

        $user->role = $request->role;
        $user->save();

        return redirect()->back();
    });

  
    Route::delete('/users/{user}', function (User $user) {
        $user->delete();

        return redirect()->back();
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
