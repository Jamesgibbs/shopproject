<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Imports\Factories\ProductImporterFactory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ProductImportController extends Controller
{
    public function __construct(private readonly ProductImporterFactory $importerFactory) {}

    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt|max:2048',
        ]);

        $importer = $this->importerFactory->createCsvImporter();

        $result = $importer->import($request->file('csv_file'));

        if ($result['errorCount'] > 0) {
            $message = "Imported {$result['successCount']} products. Failed to import {$result['errorCount']} products.";

            return redirect()->back()->with('error', $message)->with('import_errors', $result['errors']);
        }

        if ($result['successCount'] === 0 && ! empty($result['errors'])) {
            return redirect()->back()->with('error', $result['errors'][0]);
        }

        return redirect()->back()->with('success', "Successfully imported {$result['successCount']} products.");
    }
}
