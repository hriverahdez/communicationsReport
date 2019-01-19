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
            CommunicationObjective::create($value);
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
}
