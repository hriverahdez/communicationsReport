<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRequestFieldsToCommunicationReportsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('communication_reports', function (Blueprint $table) {
			$table->boolean('updated_from_request')->default(false);
			$table->date('updated_from_request_date')->nullable();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('communication_reports', function (Blueprint $table) {
			$table->dropColumn(['updated_from_request', 'updated_from_request_date']);
		});
	}
}
