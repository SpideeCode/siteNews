<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LikeController extends Controller
{
    public function index()
    {
        $likes = Like::with(['article', 'user'])->get();
        return Inertia::render('Likes/Index', [
            'likes' => $likes
        ]);
    }

    public function store(Request $request)
    {
        $like = new Like();
        $like->article_id = $request->article_id;
        $like->user_id = auth()->id();
        $like->save();
    }

    public function destroy(Like $like)
    {
        $like->delete();
    }
}
