<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::with(['article', 'user'])->get();
        return Inertia::render('Comments/Index', [
            'comments' => $comments
        ]);
    }

    public function create()
    {
        $articles = Article::all();
        return Inertia::render('Comments/Create', [
            'articles' => $articles
        ]);
    }

    public function store(Request $request)
    {
        $comment = new Comment();
        $comment->content = $request->content;
        $comment->article_id = $request->article_id;
        $comment->user_id = auth()->id();
        $comment->save();
    }

    public function show(Comment $comment)
    {
        return Inertia::render('Comments/Show', [
            'comment' => $comment->load(['article', 'user'])
        ]);
    }

    public function edit(Comment $comment)
    {
        return Inertia::render('Comments/Edit', [
            'comment' => $comment
        ]);
    }

    public function update(Request $request, Comment $comment)
    {
        $comment->content = $request->content;
        $comment->save();
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();
    }
}
