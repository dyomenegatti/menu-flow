<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('restaurants', function (Blueprint $table) {
            $table->unsignedSmallInteger('delivery_time_min')->nullable();
            $table->unsignedSmallInteger('delivery_time_max')->nullable();

            $table->unsignedSmallInteger('pickup_time_min')->nullable();
            $table->unsignedSmallInteger('pickup_time_max')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('restaurants', function (Blueprint $table) {
            $table->dropColumn([
                'delivery_time_min',
                'delivery_time_max',
                'pickup_time_min',
                'pickup_time_max',
            ]);
        });
    }
};
