<?php

namespace Tests\Feature;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class ProductImportTest extends TestCase
{
    use RefreshDatabase;

    public function test_supplier_can_import_products_via_csv()
    {
        $supplier = User::factory()->create([
            'role' => Role::SUPPLIER->value,
        ]);
        $this->actingAs($supplier);

        $csvContent = "name,description,price,stock_quantity\n";
        $csvContent .= "Product 1,Description 1,10.50,100\n";
        $csvContent .= "Product 2,Description 2,20.00,50\n";

        $file = UploadedFile::fake()->createWithContent('products.csv', $csvContent);

        $response = $this->post(route('products.supplier.products.import'), [
            'csv_file' => $file,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Successfully imported 2 products.');
        $this->assertDatabaseHas('products', ['name' => 'Product 1', 'supplier_id' => $supplier->id]);
        $this->assertDatabaseHas('products', ['name' => 'Product 2', 'supplier_id' => $supplier->id]);
    }

    public function test_import_validates_required_columns()
    {
        $supplier = User::factory()->create([
            'role' => Role::SUPPLIER->value,
        ]);
        $this->actingAs($supplier);

        $csvContent = "name,description,price\n"; // Missing stock_quantity
        $csvContent .= "Product 1,Description 1,10.50\n";

        $file = UploadedFile::fake()->createWithContent('products.csv', $csvContent);

        $response = $this->post(route('products.supplier.products.import'), [
            'csv_file' => $file,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('error', 'Missing required column: stock_quantity');
    }

    public function test_import_handles_partial_failures()
    {
        $supplier = User::factory()->create([
            'role' => Role::SUPPLIER->value,
        ]);
        $this->actingAs($supplier);

        $csvContent = "name,description,price,stock_quantity\n";
        $csvContent .= "Valid Product,Description,10.50,100\n";
        $csvContent .= ",Invalid Product (no name),10.50,100\n";

        $file = UploadedFile::fake()->createWithContent('products.csv', $csvContent);

        $response = $this->post(route('products.supplier.products.import'), [
            'csv_file' => $file,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('error');
        $response->assertSessionHas('import_errors');

        $importErrors = session('import_errors');
        $this->assertCount(1, $importErrors);
        $this->assertStringContainsString('Row 3: The name field is required', $importErrors[0]);

        $this->assertDatabaseHas('products', ['name' => 'Valid Product']);
        $this->assertDatabaseCount('products', 1);
    }
}
