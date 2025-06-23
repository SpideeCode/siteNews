<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;

class ArticleSeeder extends Seeder
{
    public function run()
    {
        Article::create([
            'title' => 'Premier article',
            'content' => 'Contenu de l\'article 1',
            'category_id' => 1,
            'user_id' => 1,
        ]);

        Article::create([
            'title' => 'Deuxième article',
            'content' => 'Contenu de l\'article 2',
            'category_id' => 2,
            'user_id' => 2,
        ]);

        Article::create([
            'title' => 'Troisième article',
            'content' => 'Contenu de l\'article 3',
            'category_id' => 3,
            'user_id' => 3,
        ]);
    }
}
