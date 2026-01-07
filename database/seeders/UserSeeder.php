<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    // seeder for leaderboard test
    public function run(): void
    {
        for ($i = 1; $i <= 50; $i++) {
            User::create([
                'name' => 'Player ' . $i,
                'email' => 'player' . $i . '@game.test',
                'password' => Hash::make('password'),

                'money' => rand(0, 3000),
                'wood' => rand(0, 3000),
                'stone' => rand(0, 3000),
                'food' => rand(0, 3000),

                'lumber_mill_level' => rand(0, 100),
                'quarry_level' => rand(0, 100),
                'farm_level' => rand(0, 100),

                'achievment_level' => rand(0, 4)
            ]);
        }
    }
}
