<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'testsupplier@test.com'],
            [
                'name' => 'Test Supplier User',
                'password' => Hash::make('password'),
                'role' => 'supplier',
            ]);

        User::firstOrCreate(
            ['email' => 'testcustomer@test.com'],
            [
                'name' => 'Test Customer User',
                'password' => Hash::make('password'),
                'role' => 'customer',
            ]);

        $this->call([
            ProductSeeder::class,
        ]);
    }
}
