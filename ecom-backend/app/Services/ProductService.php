<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\TempImage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Str;

class ProductService
{
    public function getAllProducts($request)
    {
        $query = Product::with(['product_images', 'product_sizes']);


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

        // Add optional fields
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

        // Create the product first
        $product = Product::create($data);

        //  Then handle images
        if (!empty($request->gallery)) {
            foreach ($request->gallery as $key => $tempImageId) {
                $tempImage = TempImage::find($tempImageId);

                if (!$tempImage) continue;

                $ext = pathinfo($tempImage->name, PATHINFO_EXTENSION);
                $imageName = $product->id . '-' . time() . '-' . Str::random(6) . '.' . $ext;

                $manager = new ImageManager(new Driver());

                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $largePath = public_path('uploads/products/large/' . $imageName);
                $smallPath = public_path('uploads/products/small/' . $imageName);

                // Generate images
                $manager->read($sourcePath)->scaleDown(1200)->save($largePath);
                $manager->read($sourcePath)->scaleDown(400, 460)->save($smallPath);

                $productImage = new ProductImage();
                $productImage->product_id = $product->id;
                $productImage->image = $imageName;
                $productImage->save();

                // Set main image if first
                if ($key == 0) {
                    $product->image = $imageName;
                    $product->save();
                }

                // Optional: Save to product_images
                // ProductImage::create([
                //     'product_id' => $product->id,
                //     'image' => $imageName,
                // ]);
            }
        }

        return $product;
    }


    public function getProductById($id)
    {
        return Product::with(['product_images', 'product_sizes'])->find($id);
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

        File::delete(public_path('uploads/products/large/' . $product->image));
        File::delete(public_path('uploads/products/small/' . $product->image));

        $product->delete();
        return true;
    }
}
