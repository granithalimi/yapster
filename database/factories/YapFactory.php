<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Yap>
 */
class YapFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'message' => $this->faker->sentence(),
            'convo_id' => null,      // set manually in seeder
            'sender_id' => null,     // set manually in seeder
            'receiver_id' => null,   // set manually in seeder
        ];
    }
}
