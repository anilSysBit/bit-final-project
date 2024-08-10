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
        Schema::create('blood_request', function (Blueprint $table) {
            $table->id();
            $table->string('patient_name');
            $table->string('phone');
            $table->boolean('requestor_same_as_patient')->default(false);
            $table->string('requestor_name')->nullable();
            $table->string('requestor_phone')->nullable();
            $table->string('address');
            $table->string('hospital_name');
            $table->text('other')->nullable();
            $table->string('hospital_referral')->nullable();
            $table->enum('status', ['pending', 'completed', 'cancelled','onprocess'])->default('pending');
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
        Schema::dropIfExists('blood_request');
    }
};
