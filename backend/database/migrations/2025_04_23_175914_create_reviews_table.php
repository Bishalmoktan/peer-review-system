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
        Schema::create('reviews', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->uuid('id')->primary();
            $table->uuid('assignment_id');
            $table->uuid('reviewer_id');
            $table->text('feedback');
            $table->unsignedTinyInteger('rating');
            $table->timestamp('created_at')->useCurrent();


            $table->unique(['assignment_id', 'reviewer_id']); // prevent duplicate reviews
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
