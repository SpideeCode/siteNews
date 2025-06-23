<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        Category::create(['name' => 'Tech']);
        Category::create(['name' => 'Sport']);
        Category::create(['name' => 'Culture']);
    }
}
