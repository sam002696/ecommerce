<?php

namespace App\Services;

use App\Models\Brand;
use Illuminate\Support\Facades\Validator;

class BrandService
{
    public function getAllBrands($request)
    {
        $query = Brand::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $brands = $query->orderBy('created_at', 'desc')->paginate(10);

        return [
            'brands' => $brands->items(),
            'pagination' => [
                'current_page' => $brands->currentPage(),
                'per_page' => $brands->perPage(),
                'total' => $brands->total(),
                'total_pages' => $brands->lastPage(),
                'has_more_pages' => $brands->hasMorePages(),
            ]
        ];
    }

    public function createBrand($request)
    {
        $validated = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'status' => 'integer|in:0,1',
        ])->validate();

        return Brand::create($validated);
    }

    public function getBrandById($id)
    {
        return Brand::find($id);
    }

    public function updateBrand($request, $id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return null;
        }

        $validated = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'status' => 'sometimes|integer|in:0,1',
        ])->validate();

        $brand->update($validated);
        return $brand;
    }

    public function deleteBrand($id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return null;
        }

        $brand->delete();
        return true;
    }
}
