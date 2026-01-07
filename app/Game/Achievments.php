<?php
namespace App\Game;

use App\Models\User;

Class Achievments{
    public function getAchievments(): array{
        return ['achievment1' => ['name' => 'Collect 1000 gold', 'money' => 1000, 'wood' => 0, 'stone' => 0, 'food' => 0],
            'achievment2' => ['name' => 'Collect 1000 wood', 'money' => 0, 'wood' => 1000, 'stone' => 0, 'food' => 0],
            'achievment3' => ['name' => 'Collect 1000 stone', 'money' => 0, 'wood' => 0, 'stone' => 1000, 'food' => 0],
            'achievment4' => ['name' => 'Collect 1000 food', 'money' => 0, 'wood' => 0, 'stone' => 0, 'food' => 1000],
    ];
    }
}