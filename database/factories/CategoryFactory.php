<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'slug' => $this->faker->slug(),
            'description' => $this->faker->text(),
            'image' => "https://picsum.photos/seed/category-{$this->faker->unique()->numberBetween(1,9999)}/600/300",
        ];
    }

    public function childOf($parent)
    {
        return $this->state(function () use ($parent) {
            $name = $this->faker->unique()->words(2, true);

            return [
                'name' => $name,
                'slug' => Str::slug($name),
                'parent_id' => $parent->id,
                'image' => "https://picsum.photos/seed/category-{$this->faker->unique()->numberBetween(1,9999)}/600/300"
            ];
        });
    }

}
