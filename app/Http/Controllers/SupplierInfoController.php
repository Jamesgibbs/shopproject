<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SupplierInfoController extends Controller
{
    public function edit(Request $request): Response
    {
        return Inertia::render('Supplier/Info/Edit', [
            'user' => $request->user()->only(['id', 'name', 'supplier_overview']),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'supplier_overview' => 'nullable|string|max:2000',
        ]);

        $request->user()->update($validated);

        return redirect()->back()->with('success', 'Supplier information updated successfully.');
    }
}
