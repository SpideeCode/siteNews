<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;




class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::with(['category', 'tags', 'user', 'likes'])->get();

        return Inertia::render('Welcome', [
            'articles' => $articles
        ]);
    }


    public function create()
    {
        $categories = Category::all();
        $tags = Tag::all();

        return Inertia::render('CreateArticle', [
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'tags' => 'array',
            'tags.*' => 'exists:tags,id',
        ]);

        $article = Article::create([
            'title' => $data['title'],
            'content' => $data['content'],
            'category_id' => $data['category_id'],
            'user_id' => auth()->id(),
        ]);

        $article->tags()->sync($data['tags'] ?? []);

        return redirect()->route('auteur.articles');
    }



    public function show(Article $article)
    {
        return Inertia::render('Articles/Show', [
            'article' => $article->load(['category', 'tags', 'user'])
        ]);
    }

    public function edit(Article $article)
    {
        $categories = Category::all();
        $tags = Tag::all();

        $article->load('tags');

        return Inertia::render('EditArticle', [
            'article' => $article,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }



    public function update(Request $request, Article $article)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'tags' => 'array',
            'tags.*' => 'exists:tags,id',
        ]);

        $article->update([
            'title' => $data['title'],
            'content' => $data['content'],
            'category_id' => $data['category_id'],
        ]);

        $article->tags()->sync($data['tags'] ?? []);

        return redirect()->route('auteur.articles');
    }



    public function destroy(Article $article)
    {
        $article->comments()->delete();
        $article->likes()->delete();
        $article->delete();

        return redirect()->back()->with('success', 'Article supprimé.');
    }


    public function myArticles()
    {
        $articles = auth()->user()->articles()->with(['category', 'tags'])->get();
        $categories = \App\Models\Category::all();
        return Inertia::render('AuthorArticles', [
            'articles' => $articles,
            'auth' => auth()->user(),
        ]);
    }
}
