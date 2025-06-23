<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        $tags = ['Tech', 'Science', 'Gaming', 'Sport', 'Food', 'Lifestyle'];

        foreach ($tags as $name) {
            Tag::create(['name' => $name]);
        }
    }
}
