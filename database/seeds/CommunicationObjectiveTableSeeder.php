<?php

use Illuminate\Database\Seeder;
use App\CommunicationObjective;

class CommunicationObjectiveTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = $this->getData();

        foreach ($data as $value) {
					$entity = CommunicationObjective::create($value);
					$communicationWays = $this->getCommunicationWays($entity->id);
					$entity->communicationWays()->createMany($communicationWays);
        }
    }

    private function getData() {
        $data = [
            [
                'name' => 'Bateria Sandino',
								'type' => 'BATTERY'
            ],
            [
                'name' => 'Benito Juarez',
								'type' => 'GEA'
            ],
            [
                'name' => 'Paso Real',
								'type' => 'SUB_STATION'
            ]
        ];

        return $data;
		}

		private function getCommunicationWays($communicationObjectiveId) {

			$data = $this->getCommnucationWaysDictionary($communicationObjectiveId);

			if ( !array_key_exists($communicationObjectiveId, $data) ) {
				return array();
			}

			$communicationWays = $data[$communicationObjectiveId];
			return $communicationWays;
		}

		private function getCommnucationWaysDictionary($communicationObjectiveId) {
			$data = [
				1 => [
					[
						'type' => 'TRUNKING',
						'communication_objective_id' => $communicationObjectiveId,
						'contact_number' => '132-6547-987',
					],

					[
						'type' => 'CELLPHONE',
						'communication_objective_id' => $communicationObjectiveId,
						'contact_number' => '52837158'
					],

					[
						'type' => 'FM',
						'communication_objective_id' => $communicationObjectiveId,
					],
				],

				2 => [
					[
						'type' => 'TRUNKING',
						'communication_objective_id' => $communicationObjectiveId,
						'contact_number' => '132-6547-987'
					],

					[
						'type' => 'CELLPHONE',
						'communication_objective_id' => $communicationObjectiveId,
						'contact_number' => '52837158'
					],

					[
						'type' => 'INTERNAL_PHONE',
						'communication_objective_id' => $communicationObjectiveId,
						'contact_number' => '26166'
					],

					[
						'type' => 'EXTERNAL_PHONE',
						'communication_objective_id' => $communicationObjectiveId,
						'contact_number' => '48754989'
					]
				]
			];

			return $data;
		}
}
