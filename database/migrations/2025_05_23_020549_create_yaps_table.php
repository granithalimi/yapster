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
        Schema::create('yaps', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("convo_id");
            $table->unsignedBigInteger("sender_id");
            $table->unsignedBigInteger("receiver_id");
            $table->string("message");
            $table->timestamps();

            $table->foreign("convo_id")->references("id")->on("conversations")->onDelete("cascade");
            $table->foreign("sender_id")->references("id")->on("users")->onDelete("cascade");
            $table->foreign("receiver_id")->references("id")->on("users")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('yaps');
    }
};
