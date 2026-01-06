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

        $incomePerSecond =[
            'money' => $user->lumber_mill_level + $user->quarry_level + $user->farm_level,
            'wood' => $user->lumber_mill_level,
            'stone' => $user-> quarry_level,
            'food' => $user->farm_level
        ];

        foreach($incomePerSecond as $resource => $rate) {
            $user->$resource += round($rate * $seconds / 3);
        }

        $user->last_income_at = $now;
        $user->save();
    }

}