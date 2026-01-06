<?php
namespace App\Game;

use App\Models\User;

Class upgradeCost{
    public function cost(string $building, int $currentLevel): array{
        return match($building){
            'lumber_mill' => [10 * ($currentLevel), 0, 0],
            'quarry' => [25 * ($currentLevel + 1), 5 * ($currentLevel + 1), 0],
            'farm' => [50 * ($currentLevel + 1), 10 * ($currentLevel + 1), 5 * ($currentLevel + 1)],
            default => [0, 0, 0]
        };
    }

    public function calcCost(User $user): array{
        $buildingCost =[
            'lumber_mill' => ['money' => $user->lumber_mill_level * 10, 'wood' => 0, 'stone' => 0],
            'quarry' => ['money' => ($user->quarry_level + 1) * 25, 'wood' => ($user->quarry_level + 1) * 5, 'stone' => 0],
            'farm' => ['money' => ($user->farm_level + 1) * 50, 'wood' => ($user->farm_level + 1) * 10, 'stone' => ($user->farm_level + 1) * 5]
        ];

        return $buildingCost;
    }

}