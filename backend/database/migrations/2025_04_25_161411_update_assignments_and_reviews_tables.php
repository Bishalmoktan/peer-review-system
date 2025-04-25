<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Update assignments table
        Schema::table('assignments', function (Blueprint $table) {
            $table->timestamp('updated_at')->nullable()->after('created_at');

            // Foreign key to users table
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Update reviews table
        Schema::table('reviews', function (Blueprint $table) {
            $table->timestamp('updated_at')->nullable()->after('created_at');

            // Foreign keys
            $table->foreign('assignment_id')->references('id')->on('assignments')->onDelete('cascade');
            $table->foreign('reviewer_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        // Revert changes to assignments table
        Schema::table('assignments', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('updated_at');
        });

        // Revert changes to reviews table
        Schema::table('reviews', function (Blueprint $table) {
            $table->dropForeign(['assignment_id']);
            $table->dropForeign(['reviewer_id']);
            $table->dropColumn('updated_at');
        });
    }
};
