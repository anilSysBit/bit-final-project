<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{User,BloodRequest};
use Faker\Factory as Faker;

class BloodRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Fetch some existing user IDs
        $userIds = User::pluck('id')->toArray();

        // Generate 10 blood requests
        foreach (range(1, 10) as $index) {
            BloodRequest::create([
                'user_id' =>1, // Randomly assign an existing user
                'patient_name' => $faker->name,
                'phone' => $faker->phoneNumber,
                'requestor_same_as_patient' => $faker->boolean,
                'requestor_name' => $faker->boolean ? $faker->name : null,
                'requestor_phone' => $faker->boolean ? $faker->phoneNumber : null,
                'address' => $faker->address,
                'hospital_name' => $faker->company,
                'blood_group' => $faker->randomElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
                'quantity' => $faker->numberBetween(1, 10),
                'other' => $faker->optional()->text,
                'hospital_referral' => $faker->optional()->word,
                'status' => $faker->randomElement(['pending', 'completed', 'cancelled', 'onprocess']),
            ]);
        }
    }
}
