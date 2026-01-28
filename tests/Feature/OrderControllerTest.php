<?php

namespace Tests\Feature;

use App\Enums\Role;
use App\Models\Cart;
use App\Models\User;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class OrderControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMiddleware(VerifyCsrfToken::class);
    }

    public function test_it_can_create_an_order()
    {
        Event::fake();

        $user = User::factory()->create(['role' => Role::CUSTOMER->value]);
        $cart = Cart::factory()->create(['user_id' => $user->id]);
        $this->actingAs($user);

        $response = $this->call('POST', route('orders.submit'));

        //        $this->assertDatabaseHas('orders', [
        //            'user_id'      => $user->id,
        //            'status'       => 'pending',
        //            'total_amount' => 123.45,
        //        ]);

        dump($response->getContent());

        $response
            ->assertRedirect()
            ->assertSessionHas('success', 'Order Submitted!');
    }
}
