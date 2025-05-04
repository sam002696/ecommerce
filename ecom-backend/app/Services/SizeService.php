<?php

namespace App\Services;

use App\Models\Size;

class SizeService
{
    /**
     * Get all sizes 
     */
    public function getAllSizes()
    {
        return Size::orderBy('name')->get(); // or whatever field makes sense to sort
    }
}
