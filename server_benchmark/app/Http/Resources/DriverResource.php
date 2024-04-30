<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DriverResource extends JsonResource
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
            'driver_id' => $this->driver_id,
            'name' => $this->name,
            'age' => $this->age,
            'gender' => $this->gender,
            'phone_number' => $this->phone_number,
            'address' => $this->address,
            'email' => $this->email,
        ];
    }
}