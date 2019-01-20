<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Enums;
use Carbon\Carbon;

class CreateCommunicationReportsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('communication_reports', function (Blueprint $table) {
			$table->increments('id');
			$table->enum('status', Enums::COMMUNICATION_REPORT_STATUS)->default('GOOD');
			$table->mediumText('details')->nullable();
			$table->date('date')->default(Carbon::now());

			$table->unsignedInteger('communication_objective_id');
			$table->foreign('communication_objective_id')
						->references('id')
						->on('communication_objectives');

			$table->unsignedInteger('communication_way_id');
			$table->foreign('communication_way_id')
						->references('id')
						->on('communication_ways');

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
		Schema::dropIfExists('communication_reports');
	}
}
