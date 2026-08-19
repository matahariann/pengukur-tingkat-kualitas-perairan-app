<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FeedingTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('feeding_types')->insert([
            [
                'code' => 'CAR',
                'name' => 'Carnivores',
                'weight' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'HER',
                'name' => 'Herbivores',
                'weight' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'OMNI',
                'name' => 'Omnivores',
                'weight' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'SF',
                'name' => 'Suspension feeders',
                'weight' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'SDF',
                'name' => 'Surface Deposit Feeders',
                'weight' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'SSDF',
                'name' => 'Sub Surface Deposit Feeders',
                'weight' => 7,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
