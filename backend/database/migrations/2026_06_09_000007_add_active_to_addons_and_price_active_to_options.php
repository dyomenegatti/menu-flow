<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('addons', function (Blueprint $table) {
            if (! Schema::hasColumn('addons', 'active')) {
                $table->boolean('active')->default(true);
            }
        });

        Schema::table('options', function (Blueprint $table) {
            if (! Schema::hasColumn('options', 'price')) {
                $table->decimal('price', 10, 2)->nullable();
            }

            if (! Schema::hasColumn('options', 'active')) {
                $table->boolean('active')->default(true);
            }
        });
    }

    public function down(): void
    {
        Schema::table('options', function (Blueprint $table) {
            $columns = array_filter(['active', 'price'], fn (string $column) => Schema::hasColumn('options', $column));

            if ($columns !== []) {
                $table->dropColumn($columns);
            }
        });

        Schema::table('addons', function (Blueprint $table) {
            if (Schema::hasColumn('addons', 'active')) {
                $table->dropColumn('active');
            }
        });
    }
};
