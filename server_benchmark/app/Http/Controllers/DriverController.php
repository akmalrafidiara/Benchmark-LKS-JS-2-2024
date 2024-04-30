<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Driver;
use App\Http\Resources\DriverResource;

class DriverController extends Controller
{
    public function index()
    {
        $driver = Driver::all();
        $driver = DriverResource::collection($driver);

        return response()->json($driver);
    }

    public function create(Request $request)
    {
        $validator = validator($request->all(), [
            'driver_id' => 'required|string|unique:driver',
            'name' => 'required|string',
            'age' => 'required|integer|min:18',
            'gender' => 'required|in:male,female',
            'phone_number' => 'required|string',
            'address' => 'required|string',
            'email' => 'required|email'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => "Invalid Field"], 422);
        }

        $driver = Driver::create($request->all());

        return response()->json([
            "message" => "Create Driver Success",
        ]);
    }

    public function update(Request $request, $id)
    {
        $validator = validator($request->all(), [
            'driver_id' => 'string|unique:driver,driver_id,' . $id . ',driver_id',
            'name' => 'string',
            'age' => 'integer',
            'gender' => 'in:male,female',
            'phone_number' => 'string',
            'address' => 'string',
            'email' => 'email'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => "Invalid Field"], 422);
        }

        $driver = Driver::where('driver_id', $id)->first();
        $driver->update($request->all());

        return response()->json([
            "message" => "Update Driver Success",
        ]);
    }

    public function destroy($id)
    {
        $driver = Driver::find($id);
        $driver->delete();

        return response()->json([
            "message" => "Delete Driver Success",
        ]);
    }
}
