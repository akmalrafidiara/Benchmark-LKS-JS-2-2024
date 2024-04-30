<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Corridor;
use App\Http\Resources\CorridorResource;
use App\Models\Driver;
use App\Models\Bus;

class CorridorController extends Controller
{
    public function index()
    {
        $corridor = Corridor::all();
        $corridor = CorridorResource::collection($corridor);

        return response()->json($corridor);
    }

    public function create(Request $request)
    {
        $validator = validator($request->all(), [
            'corridor_code' => 'required|string',
            'driver_id' => 'required|string',
            'bus_id' => 'required|integer',
            'duty_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'finish_time' => 'required|date_format:H:i'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => "Invalid Field"], 422);
        }

        $checkDriver = Driver::where('driver_id', $request->driver_id)->first();
        if (!$checkDriver) {
            return response()->json(['message' => 'Driver Not Found'], 404);
        }

        $checkBus = Bus::where('id', $request->bus_id)->first();
        if (!$checkBus) {
            return response()->json(['message' => 'Bus Not Found'], 404);
        }

        $getCorridorDriver = Corridor::where('duty_date', $request->duty_date)
            ->where('driver_id', $request->driver_id)
            ->where('start_time', '<', $request->finish_time)
            ->where('finish_time', '>', $request->start_time)
            ->first();

        $getCorridorBus = Corridor::where('duty_date', $request->duty_date)
            ->where('bus_id', $request->bus_id)
            ->where('start_time', '<', $request->finish_time)
            ->where('finish_time', '>', $request->start_time)
            ->first();


        if ($getCorridorDriver || $getCorridorBus) {
            return response()->json(['message' => 'Corridor Already Exist'], 422);
        }

        $workTime = strtotime($request->finish_time) - strtotime($request->start_time);
        $request['duty_time_in_minutes'] = $workTime / 60;

        $corridor = Corridor::create($request->all());

        return response()->json([
            "message" => "Create Corridor Success",
        ]);
    }

    public function destroy($id)
    {
        $corridor = Corridor::find($id);
        $corridor->delete();

        return response()->json([
            "message" => "Delete Corridor Success",
        ]);
    }
}
