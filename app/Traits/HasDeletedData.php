<?php

namespace App\Traits;

trait HasDeletedData
{
    public function anonymizePersonalData(): void
    {
        $fields = method_exists($this, 'getPersonalDataFields')
            ? $this->getPersonalDataFields()
            : $this->personalDataFields;

        foreach ($fields as $field => $type) {
            if (isset($this->$field)) {
                $this->$field = $this->getAnonymizedValue($type);
            }
        }

        $this->is_anonymized = true;
        $this->anonymized_at = now();
        $this->save();
    }

    protected function getAnonymizedValue(string $type): ?string
    {
        return match ($type) {
            'text' => 'ANONYMIZED_'.substr(md5(uniqid()), 0, 8),
            'email' => sprintf('anonymous_%s@redacted.invalid', substr(md5(uniqid()), 0, 8)),
            'phone' => preg_replace('/[0-9]/', '*', '+00000000000'),
            'address' => 'ANONYMIZED_ADDRESS',
            'foreign_key' => null,
            default => 'ANONYMIZED',
        };
    }
}
