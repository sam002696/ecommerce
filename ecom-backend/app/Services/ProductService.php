<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Validator;

class ProductService
{
    public function getAllProducts($request)
    {
        $query = Product::query();

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $products = $query->orderBy('created_at', 'desc')->paginate(10);

        return [
            'products' => $products->items(),
            'pagination' => [
                'current_page' => $products->currentPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
                'total_pages' => $products->lastPage(),
                'has_more_pages' => $products->hasMorePages(),
            ]
        ];
    }

    public function createProduct($request)
    {
        // Validate required fields
        $validated = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'sku' => 'required|string|max:100',
            'is_featured' => 'in:yes,no',
            'status' => 'integer|in:0,1',
        ])->validate();

        // Add optional fields manually
        $optional = $request->only([
            'compare_price',
            'description',
            'short_description',
            'image',
            'brand_id',
            'qty',
            'barcode'
        ]);

        $data = array_merge($validated, $optional);

        return Product::create($data);
    }

    public function getProductById($id)
    {
        return Product::find($id);
    }

    public function updateProduct($request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return null;
        }

        $validated = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric',
            'category_id' => 'sometimes|required|exists:categories,id',
            'sku' => 'sometimes|required|string|max:100',
            'is_featured' => 'in:yes,no',
            'status' => 'integer|in:0,1',
        ])->validate();

        $optional = $request->only([
            'compare_price',
            'description',
            'short_description',
            'image',
            'brand_id',
            'qty',
            'barcode'
        ]);

        $data = array_merge($validated, $optional);

        $product->update($data);

        return $product;
    }

    public function deleteProduct($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return null;
        }

        $product->delete();
        return true;
    }
}
