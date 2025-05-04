<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TempImage;
use App\Services\ApiResponseService;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

use Exception;
use Illuminate\Support\Facades\Validator;

class TempImageController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validate the image
            $validator = Validator::make($request->all(), [
                'image' => 'required|image|max:2048',
            ]);

            // if ($validator->fails()) {
            //     return ApiResponseService::handleValidationError($validator);
            // }

            // Process & store image
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();

            $originalPath = public_path('uploads/temp');
            $thumbPath = public_path('uploads/temp/thumb');

            // Create directories if missing
            if (!file_exists($originalPath)) mkdir($originalPath, 0755, true);
            if (!file_exists($thumbPath)) mkdir($thumbPath, 0755, true);

            // Move original image
            $image->move($originalPath, $imageName);

            // Generate thumbnail using Intervention Image v3
            $manager = new ImageManager(new Driver());
            $img = $manager->read($originalPath . '/' . $imageName);

            $img->scaleDown(400, 450)->save($thumbPath . '/' . $imageName);

            // Save record
            $tempImage = new TempImage();
            $tempImage->name = $imageName;
            $tempImage->save();

            return ApiResponseService::successResponse(
                [
                    'name' => $imageName,
                    'original_url' => url('uploads/temp/' . $imageName),
                    'thumbnail_url' => url('uploads/temp/thumb/' . $imageName)
                ],
                'Image and thumbnail uploaded successfully',
                200
            );
        } catch (Exception $e) {
            return ApiResponseService::handleUnexpectedError($e);
        }
    }
}
