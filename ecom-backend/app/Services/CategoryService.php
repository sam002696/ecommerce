<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Support\Facades\Validator;

class CategoryService
{
    public function getAllCategories($request)
    {
        $query = Category::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $categories = $query->orderBy('created_at', 'desc')->paginate(10);

        return [
            'categories' => $categories->items(),
            'pagination' => [
                'current_page' => $categories->currentPage(),
                'per_page' => $categories->perPage(),
                'total' => $categories->total(),
                'total_pages' => $categories->lastPage(),
                'has_more_pages' => $categories->hasMorePages(),
            ]
        ];
    }

    public function createCategory($request)
    {
        $validated = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'status' => 'integer|in:0,1',
        ])->validate();

        return Category::create($validated);
    }

    public function getCategoryById($id)
    {
        return Category::find($id);
    }

    public function updateCategory($request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return null;
        }

        $validated = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'status' => 'sometimes|integer|in:0,1',
        ])->validate();

        $category->update($validated);
        return $category;
    }

    public function deleteCategory($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return null;
        }

        $category->delete();
        return true;
    }
}
