<?php

namespace App\Services;

use App\Models\TempImage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class TempImageService
{
    public function handleUpload(Request $request)
    {
        // Validate image
        Validator::make($request->all(), [
            'image' => 'required|image|max:2048',
        ])->validate();

        // Process image
        $image = $request->file('image');
        $imageName = time() . '.' . $image->getClientOriginalExtension();

        $originalPath = public_path('uploads/temp');
        $thumbPath = public_path('uploads/temp/thumb');

        // Ensure directories exist
        if (!file_exists($originalPath)) mkdir($originalPath, 0755, true);
        if (!file_exists($thumbPath)) mkdir($thumbPath, 0755, true);

        // Move original image
        $image->move($originalPath, $imageName);

        // Generate thumbnail
        $manager = new ImageManager(new Driver());
        $img = $manager->read($originalPath . '/' . $imageName);
        $img->scaleDown(400, 450)->save($thumbPath . '/' . $imageName);

        // Save to DB
        $tempImage = new TempImage();
        $tempImage->name = $imageName;
        $tempImage->save();

        return [
            'id' => $tempImage->id,
            'name' => $imageName,
            'original_url' => url('uploads/temp/' . $imageName),
            'thumbnail_url' => url('uploads/temp/thumb/' . $imageName)
        ];
    }
}
