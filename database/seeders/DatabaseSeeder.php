<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

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
                'email_verified_at' => now(),
                'supplier_overview' => 'This is the dummy supplier overview text giving a brief description about the supplier.',
            ]);

        User::firstOrCreate(
            ['email' => 'testcustomer@test.com'],
            [
                'name' => 'Test Customer User',
                'password' => Hash::make('password'),
                'role' => 'customer',
                'email_verified_at' => now(),
            ]);

        $topLevelNames = [
            'Jewelry & Accessories',
            'Clothing & Shoes',
            'Home & Living',
            'Wedding & Party',
            'Toys & Entertainment',
            'Art & Collectibles',
            'Craft Supplies & Tools',
            'Vintage Items',
            'Electronics & Gadgets',
            'Bath & Beauty',
            'Pet Supplies',
            'Books, Movies & Music',
        ];

        $parents = collect($topLevelNames)->map(function ($name) {
            return Category::factory()->create([
                'name' => $name,
                'slug' => Str::slug($name),
                'parent_id' => null,
            ]);
        });

        // Create subcategories (1 layer deep)
        $parents->each(function ($parent) {
            Category::factory()
                ->count(10)
                ->childOf($parent)
                ->create();
        });

        $allCategories = Category::all();
        Product::factory()->count(200)
            ->create()
            ->each(function ($product) use ($allCategories) {
                $product->categories()->attach($allCategories->random(rand(1, 3))->pluck('id'));
            });
    }
}
