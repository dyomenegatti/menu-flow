<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('restaurants', function (Blueprint $table) {
            $table->foreignId('address_id')->nullable()->constrained('addresses')->after('name');
            $table->dropColumn(['address', 'number', 'phone', 'opening_hours']);
        });
    }

    public function down(): void
    {
        Schema::table('restaurants', function (Blueprint $table) {
            $table->dropForeign(['address_id']);
            $table->dropColumn('address_id');
            $table->string('address', 255)->after('name');
            $table->string('number', 20)->after('address');
            $table->string('phone', 20)->after('number');
            $table->string('opening_hours', 100)->after('phone');
        });
    }
};
