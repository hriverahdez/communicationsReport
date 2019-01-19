<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Enums;

class CreateCommunicationWaysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('communication_ways', function (Blueprint $table) {
            $table->increments('id');
            $table->enum('type', Enums::COMMUNICATION_WAY_TYPES);
            $table->string('contact_number');

            $table->unsignedInteger('communication_objective_id');
            $table->foreign('communication_objective_id')
                  ->references('id')
                  ->on('communication_objectives')
                  ->onUpdate('CASCADE')
                  ->onDelete('CASCADE');

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
        Schema::dropIfExists('communication_ways');
    }
}
