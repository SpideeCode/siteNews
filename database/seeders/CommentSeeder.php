<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;

class CommentSeeder extends Seeder
{
    public function run()
    {
        Comment::create([
            'content' => 'Super article !',
            'article_id' => 1,
            'user_id' => 2,
        ]);
        Comment::create([
            'content' => 'J\'aime bien ce sujet.',
            'article_id' => 2,
            'user_id' => 3,
        ]);
        Comment::create([
            'content' => 'Merci pour l\'info.',
            'article_id' => 3,
            'user_id' => 1,
        ]);
    }
}
