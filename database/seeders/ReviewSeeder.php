<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Review;
use Database\Factories\ReviewFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /** @use HasFactory<ReviewFactory> */
    use HasFactory;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Review::factory()->count(50)->create();
    }
}
