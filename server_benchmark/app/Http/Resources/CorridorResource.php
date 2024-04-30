<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CorridorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'corridor_code' => $this->corridor_code,
            'driver_id' => $this->driver_id,
            'driver_name' => $this->driver->name,
            'bus_id' => $this->bus->id,
            'bus_plate_number' => $this->bus->plate_number,
            'bus_brand' => $this->bus->brand,
            'bus_type' => $this->bus->type,
            'duty_date' => $this->duty_date,
            'start_time' => $this->start_time,
            'finish_time' => $this->finish_time,
            'duty_time_in_minutes' => $this->duty_time_in_minutes,
        ];
    }
}
