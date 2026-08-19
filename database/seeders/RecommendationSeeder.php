<?php

namespace Database\Seeders;

use App\Models\Recommendation;
use Illuminate\Database\Seeder;

class RecommendationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'status' => 'Undisturbed Areas',
                'conclusion' => 'Water environment condition is healty, within normal range and undisturbed (Undisturbed Areas)',
                'recommendation' => 'Keep the carrying capacity environment (environmental carrying capacity) under normal/stable conditions (equilibrium)',
            ],
            [
                'status' => 'Lightly Disturbed Areas',
                'conclusion' => 'Water environment condition is healty, within normal range and lightly disturbed (Lightly Disturbed Areas)',
                'recommendation' => 'Perform monitoring and control of pollution sources to prevent quality degradation',
            ],
            [
                'status' => 'Moderately Disturbed Areas',
                'conclusion' => 'Water environment condition is moderately disturbed (Moderately Disturbed Areas)',
                'recommendation' => 'Management and mitigation actions are needed to improve water conditions',
            ],
            [
                'status' => 'Heavily Disturbed Areas',
                'conclusion' => 'Water environment condition is heavily disturbed (Heavily Disturbed Areas)',
                'recommendation' => 'Immediately identify and handle the main pollution sources',
            ],
        ];

        foreach ($data as $item) {
            Recommendation::updateOrCreate(
                ['status' => $item['status']],
                $item
            );
        }
    }
}
