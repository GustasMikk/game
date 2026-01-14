<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AchievementTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_achievement()
    {
        $user = User::factory()->create([
            'money' => 1100,
            'wood' => 1100,
            'stone' => 1100,
            'food' => 0,
            'achievment_level' => 0,

            'lumber_mill_level' => 0,
            'quarry_level' => 0,
            'farm_level' => 0,
        ]);

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/getAchievments');
        $user->refresh();
        $this->assertEquals(3, $user->achievment_level);
        $response->assertStatus(200);
    }
}
