<?php

namespace Tests\Feature;

use App\Game\upgradeCost;
use Tests\TestCase;

class UpgradeCostTest extends TestCase
{
    public function test_lumber_mill_cost()
    {
        $service = new upgradeCost;
        $cost = $service->cost('lumber_mill', 3);

        $this->assertEquals([
            0 => 30,
            1 => 0,
            2 => 0,
        ], $cost);
    }

    public function test_quarry_cost()
    {
        $service = new upgradeCost;
        $cost = $service->cost('quarry', 5);

        $this->assertEquals([
            0 => 150,
            1 => 30,
            2 => 0,
        ], $cost);
    }

    public function test_farm_cost()
    {
        $service = new upgradeCost;
        $cost = $service->cost('farm', 4);

        $this->assertEquals([
            0 => 250,
            1 => 50,
            2 => 25,
        ], $cost);
    }
}
