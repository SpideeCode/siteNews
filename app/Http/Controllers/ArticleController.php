<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::with(['category', 'tags'])->get();
        return Inertia::render('Welcome', [
            'articles' => $articles
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        $tags = Tag::all();
        return Inertia::render('Articles/Create', [
            'categories' => $categories,
            'tags' => $tags
        ]);
    }

    public function store(Request $request)
    {
        $article = new Article();
        $article->title = $request->title;
        $article->content = $request->content;
        $article->category_id = $request->category_id;
        $article->user_id = auth()->id();
        $article->save();

        $article->tags()->attach($request->tag_ids);
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
        return Inertia::render('Articles/Edit', [
            'article' => $article->load('tags'),
            'categories' => $categories,
            'tags' => $tags
        ]);
    }

    public function update(Request $request, Article $article)
    {
        $article->title = $request->title;
        $article->content = $request->content;
        $article->category_id = $request->category_id;
        $article->save();

        $article->tags()->sync($request->tag_ids);
    }

    public function destroy(Article $article)
    {
        $article->tags()->detach();
        $article->delete();
    }
}
