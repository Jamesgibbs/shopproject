<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Throwable;

class UserDataAnonymizer
{
    /**
     * Models and their relationships that need to be anonymized
     *
     * @var array<class-string, string>
     */
    protected array $relatedModels = [
        Order::class => 'user_id',
        Product::class => 'supplier_id',
    ];

    /**
     * Anonymize all personal data related to a user
     *
     * @throws Throwable
     */
    public function anonymizeUserData(int $userId): void
    {
        DB::transaction(function () use ($userId) {
            foreach ($this->relatedModels as $modelClass => $foreignKey) {
                $this->anonymizeRelatedRecords($modelClass, $foreignKey, $userId);
            }
        });
    }

    /**
     * Anonymize records for a specific model
     */
    protected function anonymizeRelatedRecords(string $modelClass, string $foreignKey, int $userId): void
    {
        $modelClass::where($foreignKey, $userId)
            ->where('is_anonymized', false)
            ->chunk(100, function ($records) {
                foreach ($records as $record) {
                    $record->anonymizePersonalData();
                    $record->is_anonymized = true;
                    $record->anonymized_at = now();
                    $record->save();
                }
            });
    }
}
