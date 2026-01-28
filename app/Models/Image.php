<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Image extends Model
{
    protected $fillable = ['path', 'name', 'alt'];

    /**
     * @return MorphTo<Model, $this>
     */
    public function imageable(): MorphTo
    {
        return $this->morphTo();
    }
}
