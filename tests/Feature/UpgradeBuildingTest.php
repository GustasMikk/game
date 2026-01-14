<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpgradeBuildingTest extends TestCase
{
    use RefreshDatabase;

    public function test_upgrading_building()
    {
        $user = User::factory()->create([
            'money' => 1000,
            'wood' => 1000,
            'stone' => 1000,
            'food' => 0,
            'achievment_level' => 0,

            'lumber_mill_level' => 0,
            'quarry_level' => 0,
            'farm_level' => 0,
        ]);

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/upgrade', ['building' => 'lumber_mill']);
        $response = $this->actingAs($user, 'sanctum')->postJson('/api/upgrade', ['building' => 'lumber_mill']);
        $response = $this->actingAs($user, 'sanctum')->postJson('/api/upgrade', ['building' => 'quarry']);
        $response = $this->actingAs($user, 'sanctum')->postJson('/api/upgrade', ['building' => 'farm']);
        $user->refresh();
        $this->assertEquals(2, $user->lumber_mill_level);
        $this->assertEquals(1, $user->quarry_level);
        $this->assertEquals(1, $user->farm_level);
        $response->assertStatus(200);
    }
}
