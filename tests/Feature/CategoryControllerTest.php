<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_view_category_page()
    {
        $category = Category::factory()->create();
        $products = Product::factory()->count(3)->create();
        $category->products()->attach($products);

        $response = $this->get(route('categories.show', $category->slug));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Categories/Show')
            ->has('category')
            ->where('category.id', $category->id)
            ->where('category.slug', $category->slug)
            ->has('category.products', 3)
        );
    }

    public function test_returns_404_for_non_existent_category()
    {
        $response = $this->get(route('categories.show', 'non-existent-slug'));

        $response->assertStatus(404);
    }
}
