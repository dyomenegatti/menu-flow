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
        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('restaurant_id')
                ->constrained('restaurants')
                ->restrictOnDelete();

            $table->string('type', 20);

            $table->string('customer_phone', 20);

            $table->string('address', 255)->nullable();
            $table->string('number', 20)->nullable();
            $table->string('neighborhood', 100)->nullable();
            $table->string('complement', 255)->nullable();

            $table->decimal('change', 10, 2)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['restaurant_id']);
           
            $table->dropColumn([
                'restaurant_id', 
                'type',
                'customer_phone',
                'address',
                'number',
                'neighborhood',
                'complement',
                'change'
            ]);
        });
    }
};
