<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('options', 'product_id')) {
            Schema::table('options', function (Blueprint $table) {
                $table->dropConstrainedForeignId('product_id');
            });
        }

        Schema::table('options', function (Blueprint $table) {
            $columns = array_filter(['type', 'default'], fn (string $column) => Schema::hasColumn('options', $column));

            if ($columns !== []) {
                $table->dropColumn($columns);
            }
        });
    }

    public function down(): void
    {
        Schema::table('options', function (Blueprint $table) {
            if (! Schema::hasColumn('options', 'product_id')) {
                $table->foreignId('product_id')->nullable()->after('id')->constrained('products')->nullOnDelete();
            }

            if (! Schema::hasColumn('options', 'type')) {
                $table->string('type', 30)->default('custom')->after('name');
            }

            if (! Schema::hasColumn('options', 'default')) {
                $table->boolean('default')->default(false)->after('type');
            }
        });
    }
};