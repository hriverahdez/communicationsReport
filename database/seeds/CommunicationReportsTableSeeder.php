<?php

use Illuminate\Database\Seeder;
use App\CommunicationReport;

class CommunicationReportsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $data = [
				[
					'status' => 'GOOD',
					'communication_objective_id' => 1,
					'communication_way_id' => 1
				],
				[
					'status' => 'BAD',
					'communication_objective_id' => 1,
					'communication_way_id' => 2
				],
				[
					'status' => 'REGULAR',
					'communication_objective_id' => 1,
					'communication_way_id' => 3
				],
				[
					'status' => 'BAD',
					'communication_objective_id' => 2,
					'communication_way_id' => 4
				],
				[
					'status' => 'GOOD',
					'communication_objective_id' => 2,
					'communication_way_id' => 5
				],
				[
					'status' => 'GOOD',
					'communication_objective_id' => 2,
					'communication_way_id' => 6
				],
				[
					'status' => 'GOOD',
					'communication_objective_id' => 2,
					'communication_way_id' => 7
				],
			];

			foreach ($data as $value) {
				CommunicationReport::create($value);
			}
    }
}
