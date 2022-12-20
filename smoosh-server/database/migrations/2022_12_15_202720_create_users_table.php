<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('full_name')->default('');
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('about')->default('');
            $table->string('status')->default('Online');
            $table->string('interest')->default('');
            $table->string('picture_url')->default('');
            $table->string('gender')->default('');
            $table->decimal('latitude')->default('0');
            $table->decimal('longitude')->default('0');
            $table->integer('user_types_id')->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
