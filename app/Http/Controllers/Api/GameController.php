<?php

namespace App\Http\Controllers\Api;

use App\Game\IncomeCalc;
use App\Game\UpgradeCost;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Nette\Utils\Json;

class GameController extends Controller
{
    public function loadStats(IncomeCalc $income){
        $user = auth()->user();

        $income->calc($user);

        return response()->json([
            'name' => $user->name,

            'money' => $user->money,
            'wood' => $user->wood,
            'stone' => $user->stone,
            'food' => $user->food,

            'lumber_mill_level' => $user->lumber_mill_level,
            'quarry_level' => $user->quarry_level,
            'farm_level' => $user->farm_level
        ]);
    }

    public function loadPrices(UpgradeCost $costCalc){
        $user = auth()->user();

        $response = $costCalc->calcCost($user);

        return response()->json($response);
    }

    public function upgrade(Request $request, UpgradeCost $costCalc){
        $building = $request->input('building');
        $user = auth()->user();

        $levelField = $building . '_level';
        $currentLevel = $user->$levelField;

        $cost = $costCalc->cost($building, $currentLevel);

        if ($user->money < $cost){
            return response()->json(['message' => 'Not enough money'], 400);
        }

        $user->money -= $cost;
        $user->$levelField++;
        $user->save();

        return response()->json([
            'message' => 'Successfuly upgraded',
            'money' => $user->money,
            $levelField = $user->$levelField
        ]);
    }
}
