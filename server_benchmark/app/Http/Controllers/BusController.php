<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bus;
use App\Http\Resources\BusResource;

class BusController extends Controller
{
    public function index()
    {
        $bus = Bus::all();
        $bus = BusResource::collection($bus);

        return response()->json($bus);
    }

    public function create(Request $request)
    {
        $validator = validator($request->all(), [
            'plate_number' => 'required|string',
            'brand' => 'required|string',
            'type' => 'required|in:small,big,articulated',
            'fuel' => 'required|in:petrol,gas,diesel,electric'
        ]);

        // if ($validator->fails()) {
        //     return response()->json(['message' => $validator->errors()], 422);
        // }

        if ($validator->fails()) {
            return response()->json(['message' => "Invalid Field"], 422);
        }

        $bus = Bus::create($request->all());

        return response()->json([
            "message" => "Create Bus Success",
        ]);
    }

    public function update(Request $request, $id)
    {
        $validator = validator($request->all(), [
            'plate_number' => 'string',
            'brand' => 'string',
            'type' => 'in:small,big,articulated',
            'fuel' => 'in:petrol,gas,diesel,electric'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => "Invalid Field"], 422);
        }

        $bus = Bus::find($id);
        $bus->update($request->all());

        return response()->json([
            "message" => "Update Bus Success",
        ]);
    }

    public function destroy($id)
    {
        $bus = Bus::find($id);
        $bus->delete();

        return response()->json([
            "message" => "Delete Bus Success",
        ]);
    }
}
