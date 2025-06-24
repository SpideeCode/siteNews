<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\Category;
use Faker\Factory as Faker;

class ArticleSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        $userIds = [1, 2, 3, 4]; 
        $categories = Category::all();

        foreach ($categories as $category) {
            for ($i = 1; $i <= 5; $i++) {
                Article::create([
                    'title' => $faker->sentence(6, true),
                    'content' => $faker->paragraphs(rand(3, 6), true),
                    'category_id' => $category->id,
                    'user_id' => $faker->randomElement($userIds),
                ]);
            }
        }
    }
}
