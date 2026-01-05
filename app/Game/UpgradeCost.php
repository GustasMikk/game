<?php
namespace App\Game;

Class upgradeCost{
    public function cost(string $building, int $currentLevel): int{
        return match($building){
            'lumber_mill' => 10 * ($currentLevel),
            'quarry' => 10 * ($currentLevel + 1),
            'farm' => 10 * ($currentLevel + 1),
            default => 0
        };
    }

}