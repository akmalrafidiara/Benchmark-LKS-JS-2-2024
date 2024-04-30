<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('corridor', function (Blueprint $table) {
            $table->id();
            $table->string('corridor_code');
            $table->string('driver_id');
            $table->unsignedBigInteger('bus_id');
            $table->date('duty_date');
            $table->time('start_time');
            $table->time('finish_time');
            $table->integer('duty_time_in_minutes');

            $table->foreign('driver_id')->references('driver_id')->on('driver');
            $table->foreign('bus_id')->references('id')->on('bus');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('corridor');
    }
};