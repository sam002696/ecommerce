<?php

namespace App\Services;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductSize;
use App\Models\TempImage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Str;

class ProductService
{
    public function getAllProducts($request)
    {
        $cacheKey = $this->generateAdminProductCacheKey($request);

        if (Redis::exists($cacheKey)) {
            return json_decode(Redis::get($cacheKey), true);
        }

        $query = Product::with(['product_images', 'product_size']);

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $products = $query->orderBy('created_at', 'desc')->paginate(10);

        $response = [
            'products' => ProductResource::collection($products),
            'pagination' => [
                'current_page' => $products->currentPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
                'total_pages' => $products->lastPage(),
                'has_more_pages' => $products->hasMorePages(),
            ]
        ];

        Redis::setex($cacheKey, 120, json_encode($response)); // Cache for 2 minutes

        return $response;
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


        $this->clearProductListCache();
        $this->clearSingleProductCache($product->id);

        // handle sizes
        if (!empty($request->sizes)) {
            ProductSize::where('product_id', $product->id)->delete();
            foreach ($request->sizes as $sizeId) {
                $productSize = new ProductSize();
                $productSize->size_id = $sizeId;
                $productSize->product_id = $product->id;
                $productSize->save();
            }
        }

        //  Then handle images
        if (!empty($request->gallery)) {
            foreach ($request->gallery as $key => $tempImageId) {
                $tempImage = TempImage::find($tempImageId);
                $rand = rand(1000, 10000);

                if (!$tempImage) continue;

                $ext = pathinfo($tempImage->name, PATHINFO_EXTENSION);
                $imageName = $product->id . '-' . $rand . time() . '-' . Str::random(6) . '.' . $ext;

                $manager = new ImageManager(new Driver());

                $sourcePath = public_path('uploads/temp/' . $tempImage->name);
                $largeDir = public_path('uploads/products/large');
                $smallDir = public_path('uploads/products/small');

                //  Ensure the directories exist
                File::ensureDirectoryExists($largeDir);
                File::ensureDirectoryExists($smallDir);

                $largePath = $largeDir . '/' . $imageName;
                $smallPath = $smallDir . '/' . $imageName;

                // Generate and save images
                $manager->read($sourcePath)->scaleDown(1200)->save($largePath);
                $manager->read($sourcePath)->scaleDown(400, 460)->save($smallPath);

                $productImage = new ProductImage();
                $productImage->product_id = $product->id;
                $productImage->image = $imageName;
                $productImage->save();

                $this->clearSingleProductCache($productImage->product_id);

                // Set main image if first
                if ($key == 0) {
                    $product->image = $imageName;
                    $product->save();
                }
            }
}


        return $product;
    }


    public function getProductById($id)
    {
        $product = Product::with(['product_images', 'product_size'])->find($id);

        // to-do 
        // $productSizes = $product->product_sizes->pluck('size_id')->toArray();

        return $product;
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


        $this->clearProductListCache();

        $this->clearSingleProductCache($product->id);

        // handle sizes
        if (!empty($request->sizes)) {
            ProductSize::where('product_id', $product->id)->delete();
            foreach ($request->sizes as $sizeId) {
                $productSize = new ProductSize();
                $productSize->size_id = $sizeId;
                $productSize->product_id = $product->id;
                $productSize->save();
            }
        }



        return $product;
    }

    public function deleteProduct($id)
    {
        $product = Product::with('product_images')->find($id);

        if (!$product) {
            return null;
        }

        // Delete product images from storage
        if ($product->product_images) {
            foreach ($product->product_images as $productImage) {
                File::delete(public_path('uploads/products/large/' . $productImage->image));
                File::delete(public_path('uploads/products/small/' . $productImage->image));
            }
        }

        $product->delete();
        $this->clearProductListCache();

        $this->clearSingleProductCache($product->id);

        return true;
    }


    public function saveProductImage($request)
    {
        //  Validate image and product ID
        $validated = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'product_id' => 'required|exists:products,id',
        ])->validate();

        $image = $request->file('image');
        $imageName = $request->product_id . '-' . time() . '.' . $image->extension();

        // Setup Intervention Image manager
        $manager = new ImageManager(new Driver());

        // Large Thumbnail (high quality)
        $img = $manager->read($image->getPathName());
        // $img->scaleDown(1200);
        $img->save(public_path('uploads/products/large/' . $imageName), 100); // 100% quality

        // Small Thumbnail (high quality)
        $img = $manager->read($image->getPathName());
        // $img->coverDown(400, 460);
        $img->save(public_path('uploads/products/small/' . $imageName), 100); // 100% quality


        //  Store image in product_images table
        $productImage = new ProductImage();
        $productImage->product_id = $request->product_id;
        $productImage->image = $imageName;
        $productImage->save();

        $this->clearProductListCache();
        $this->clearSingleProductCache($request->product_id);

        return $productImage;
    }


    public function updateDefaultImage($request)
    {
        $product = Product::find($request->product_id);

        $product->image = $request->image;




        $product->save();

        $this->clearProductListCache();
        $this->clearSingleProductCache($request->product_id);



        ProductImage::where('product_id', $request->product_id)
            ->update(['is_default' => false]);


        ProductImage::where('product_id', $request->product_id)
            ->where('image', $request->image)
            ->update(['is_default' => true]);


        return $product;
    }


    public function deleteProductImage($id)
    {
        $productImage = ProductImage::find($id);


        File::delete(public_path('uploads/products/large/' . $productImage->image));
        File::delete(public_path('uploads/products/small/' . $productImage->image));

        $productImage->delete();

        $this->clearProductListCache();
        $this->clearSingleProductCache($productImage->product_id);
        return true;
    }


    // this function clears the cache for the product list
    private function clearProductListCache(): void
    {
        $adminKeys = Redis::keys('admin:products:*');
        $frontendKeys = Redis::keys('products:*');

        $allKeys = array_merge($adminKeys, $frontendKeys);

        foreach ($allKeys as $key) {
            Redis::del($key);
        }
    }



    // this function clears the cache for a single product
    private function clearSingleProductCache($productId): void
    {
        $keys = Redis::keys("product:detail:{$productId}");
        foreach ($keys as $key) {
            Redis::del($key);
        }

        
    }


    private function generateAdminProductCacheKey($request): string
    {
        $params = [
            'page' => $request->get('page', 1),
            'search' => $request->get('search', ''),
            'status' => $request->get('status', ''),
        ];

        return 'admin:products:' . md5(json_encode($params));
    }
}
