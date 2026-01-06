<?php
namespace App\Game;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Validation\Rules\Can;

Class IncomeCalc{
    public function calc(User $user): void{
        $now = Carbon::now();
        $last = $user->last_income_at ?? $now;

        $seconds = $now->diffInSeconds($last);
        $seconds = $seconds * -1;
        
        if ($user->last_income_at == NULL){
            $user->last_income_at = $now;
            $user->save();
        }

        if ($seconds <= 3){
            return;
        }

        $income =[
            'money' => ($user->lumber_mill_level + $user->quarry_level + $user->farm_level) * 2,
            'wood' => $user->lumber_mill_level,
            'stone' => $user-> quarry_level,
            'food' => $user->farm_level
        ];

        $cap = 1000;

        foreach($income as $resource => $rate) {
            $earned = round($rate * $seconds);
            $earned = min($earned, $cap);
            $user->$resource += $earned;
        }

        $user->last_income_at = $now;
        $user->save();
    }

    // send data for whats collected
    public function calc2(User $user): array{
        $now = Carbon::now();
        $last = $user->last_income_at ?? $now;

        $seconds = $now->diffInSeconds($last);
        $seconds = $seconds * -1;
        
        if ($user->last_income_at == NULL){
            $user->last_income_at = $now;
            $user->save();
        }

        $income =[
            'money' => ($user->lumber_mill_level + $user->quarry_level + $user->farm_level) * 2,
            'wood' => $user->lumber_mill_level,
            'stone' => $user-> quarry_level,
            'food' => $user->farm_level
        ];

        $cap = 1000;

        $resources = [
            'money' => 0,
            'wood'  => 0,
            'stone' => 0,
            'food'  => 0,
        ];

        foreach ($income as $resource => $rate) {
            $earned = floor($rate * $seconds);
            $resources[$resource] = min($earned, $cap);
        }   

        return $resources;
    }

}