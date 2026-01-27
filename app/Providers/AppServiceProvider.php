<?php

namespace App\Providers;

use App\Models\Category;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'categories' => Category::whereNull('parent_id')
                ->get(['id', 'name', 'slug']),
        ]);

        Vite::prefetch(concurrency: 3);
    }
}
