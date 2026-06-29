<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (DB::getDriverName() !== 'pgsql') {
            return;
        }

        $this->rebuildOptionsTable(
            sourceTable: 'options',
            temporaryTable: 'options_reorder_backup',
            targetColumns: ['id', 'name', 'price', 'active', 'created_at', 'updated_at'],
            selectColumns: [
                'id',
                'name',
                DB::raw('price'),
                DB::raw('COALESCE(active, true) AS active'),
                'created_at',
                'updated_at',
            ],
        );

        $this->dropProductAddonsAddonForeignKey();

        $this->rebuildAddonsTable(
            sourceTable: 'addons',
            temporaryTable: 'addons_reorder_backup',
            targetColumns: ['id', 'name', 'price', 'active', 'created_at', 'updated_at'],
            selectColumns: [
                'id',
                'name',
                'price',
                DB::raw('COALESCE(active, true) AS active'),
                'created_at',
                'updated_at',
            ],
        );

        Schema::table('product_addons', function (Blueprint $table) {
            $table->foreign('addon_id')->references('id')->on('addons')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        if (DB::getDriverName() !== 'pgsql') {
            return;
        }

        $this->rebuildOptionsTable(
            sourceTable: 'options',
            temporaryTable: 'options_reorder_restore',
            targetColumns: ['id', 'name', 'price', 'created_at', 'updated_at', 'active'],
            selectColumns: ['id', 'name', 'price', 'created_at', 'updated_at', 'active'],
        );

        $this->dropProductAddonsAddonForeignKey();

        $this->rebuildAddonsTable(
            sourceTable: 'addons',
            temporaryTable: 'addons_reorder_restore',
            targetColumns: ['id', 'name', 'price', 'created_at', 'updated_at', 'active'],
            selectColumns: ['id', 'name', 'price', 'created_at', 'updated_at', 'active'],
        );

        Schema::table('product_addons', function (Blueprint $table) {
            $table->foreign('addon_id')->references('id')->on('addons')->cascadeOnDelete();
        });
    }

    private function dropProductAddonsAddonForeignKey(): void
    {
        Schema::table('product_addons', function (Blueprint $table) {
            $table->dropForeign(['addon_id']);
        });
    }

    private function rebuildOptionsTable(string $sourceTable, string $temporaryTable, array $targetColumns, array $selectColumns): void
    {
        if (! Schema::hasTable($sourceTable)) {
            return;
        }

        Schema::rename($sourceTable, $temporaryTable);

        Schema::create($sourceTable, function (Blueprint $table) use ($targetColumns) {
            $table->id();
            $table->string('name', 100);
            $table->decimal('price', 10, 2)->nullable();

            if ($targetColumns[3] === 'active') {
                $table->boolean('active')->default(true);
                $table->timestamps();
            } else {
                $table->timestamps();
                $table->boolean('active')->default(true);
            }
        });

        DB::table($sourceTable)->insertUsing(
            $targetColumns,
            DB::table($temporaryTable)->select($selectColumns)
        );

        Schema::drop($temporaryTable);

        $this->syncPgsqlSequence($sourceTable);
    }

    private function rebuildAddonsTable(string $sourceTable, string $temporaryTable, array $targetColumns, array $selectColumns): void
    {
        if (! Schema::hasTable($sourceTable)) {
            return;
        }

        Schema::rename($sourceTable, $temporaryTable);

        Schema::create($sourceTable, function (Blueprint $table) use ($targetColumns) {
            $table->id();
            $table->string('name', 100);
            $table->decimal('price', 10, 2);

            if ($targetColumns[3] === 'active') {
                $table->boolean('active')->default(true);
                $table->timestamps();
            } else {
                $table->timestamps();
                $table->boolean('active')->default(true);
            }
        });

        DB::table($sourceTable)->insertUsing(
            $targetColumns,
            DB::table($temporaryTable)->select($selectColumns)
        );

        Schema::drop($temporaryTable);

        $this->syncPgsqlSequence($sourceTable);
    }

    private function syncPgsqlSequence(string $table): void
    {
        DB::statement(
            "SELECT setval(pg_get_serial_sequence('{$table}', 'id'), COALESCE(MAX(id), 1), MAX(id) IS NOT NULL) FROM {$table}"
        );
    }
};