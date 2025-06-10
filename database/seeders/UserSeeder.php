<?php

namespace Database\Seeders;

use App\Models\Yap;
use App\Models\User;
use App\Models\Conversation;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::factory()->count(10)->create();

        foreach ($users as $user) {
            for ($i = 0; $i < 10; $i++) {
                $receiver = User::where('id', '!=', $user->id)->inRandomOrder()->first();

                $convo = Conversation::create([
                    'sender_id' => $user->id,
                    'receiver_id' => $receiver->id,
                ]);

                // Alternate sender/receiver for each yap
                for ($j = 0; $j < 10; $j++) {
                    $isUserSender = $j % 2 === 0;

                    Yap::factory()->create([
                        'convo_id' => $convo->id,
                        'sender_id' => $isUserSender ? $user->id : $receiver->id,
                        'receiver_id' => $isUserSender ? $receiver->id : $user->id,
                    ]);
                }
            }
        }
        User::find(1)->update(['phone' => '077222726', 'name' => 'Granit Halimi', 'profile' => 'gdd9uS9r4aOBjZ5MoiOvRjbfdhEg0u8KVcccVpXc.jpg']);
        User::find(2)->update(['phone' => '000000000', 'name' => 'Lesi', 'profile' => 'gAIZwmDmHmvIm8Cfsl3tkKJLFVrMQL1HCpyVlQrO.jpg']);
    }
}
