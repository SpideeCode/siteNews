<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::updateOrCreate(
            ['email' => 'admin@site.test'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        User::updateOrCreate(
            ['email' => 'webmaster@site.test'],
            [
                'name' => 'Webmaster',
                'password' => Hash::make('password'),
                'role' => 'webmaster',
            ]
        );

        User::updateOrCreate(
            ['email' => 'auteur@site.test'],
            [
                'name' => 'Auteur',
                'password' => Hash::make('password'),
                'role' => 'auteur',
            ]
        );

        User::updateOrCreate(
            ['email' => 'lecteur@site.test'],
            [
                'name' => 'Lecteur',
                'password' => Hash::make('password'),
                'role' => 'lecteur',
            ]
        );
    }
}
