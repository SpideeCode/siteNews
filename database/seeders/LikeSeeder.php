<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Like;

class LikeSeeder extends Seeder
{
    public function run()
    {
        Like::create([
            'user_id' => 1,
            'article_id' => 2,
        ]);
        Like::create([
            'user_id' => 2,
            'article_id' => 1,
        ]);
        Like::create([
            'user_id' => 3,
            'article_id' => 3,
        ]);
    }
}
