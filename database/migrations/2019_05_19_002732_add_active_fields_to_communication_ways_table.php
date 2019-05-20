<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddActiveFieldsToCommunicationWaysTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('communication_ways', function (Blueprint $table) { 
			$table->boolean('active')->default(true);
			$table->string('inactive_reason')->nullable();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('communication_ways', function (Blueprint $table) {
			$table->dropColumn(['active', 'inactive_reason']);
		});
	}
}
