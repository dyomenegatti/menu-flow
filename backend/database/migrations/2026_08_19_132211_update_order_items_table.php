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
        Schema::table('order_items', function (Blueprint $table) {
            $table->string('name', 150);
            $table->string('image', 255)->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('subtotal', 10, 2);
            $table->text('observation')->nullable();

            $table->dropColumn([
                'unit_price', 
                'addons_price', 
                'total'
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->decimal('unit_price', 10, 2);
            $table->decimal('addons_price', 10, 2)->default(0);
            $table->decimal('total', 10, 2);

            $table->dropColumn([
                'name', 
                'image',
                'price',
                'subtotal',
                'observation',
            ]);
        });
    }
};
