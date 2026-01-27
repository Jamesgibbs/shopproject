<?php

namespace App\Http\Middleware;

use App\Enums\Role;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsSupplier
{
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check() && auth()->user()->role === Role::SUPPLIER->value) {
            return $next($request);
        }

        abort(403, 'Access denied. Suppliers only.');
    }
}
