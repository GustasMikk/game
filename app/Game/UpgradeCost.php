<?php
namespace App\Game;

use App\Models\User;

Class upgradeCost{
    public function cost(string $building, int $currentLevel): int{
        return match($building){
            'lumber_mill' => 10 * ($currentLevel),
            'quarry' => 25 * ($currentLevel + 1),
            'farm' => 50 * ($currentLevel + 1),
            default => 0
        };
    }

    public function calcCost(User $user): array{
        $buildingCost =[
            'lumber_mill' => $user->lumber_mill_level * 10,
            'quarry' => ($user->quarry_level + 1) * 25,
            'farm' => ($user-> farm_level + 1) * 50
        ];

        return $buildingCost;
    }

}