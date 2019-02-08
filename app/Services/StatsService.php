<?php

namespace App\Services;

use App\CommunicationWay;
use App\CommunicationReport;
use Carbon\Carbon;
use App\Enums;


class StatsService {

	/**
	 * Gets the total percentage of availability of each group
	 * GENERATION, DISTRIBUTION AND RENEWABLE ENERGY
	 */
	public function getGeneralGroupsAvailability() {
		$date = $this->getLastReportDate();
		$results = $this->getCommunicationWaysDailyAvailability();
		$collected = collect($results)->map(function ($item) {
			return collect($item)->reduce(function ($acc, $item) {

				$total = $acc['total'] + $item['total'];
				$available = $acc['available'] + $item['available'];
				$percentage = $total > 0 ? ($available * 100) / $total : 0;
				return [
					'total' => $total,
					'available' => $available,
					'percentage' => round( $percentage, 2 )
				];

			}, [
				'total' => 0,
				'available' => 0
			]);
		});

		return [
			'date' => $date,
			'summary' => $collected
		];
	}

	/**
	 * Gets the daily availability of each communication way type separated by
	 * the groups GENERATION, DISTRIBUTION and RENEWABLE ENERGY
	 */
	public function getCommunicationWaysDailyAvailability($date = null, $status = 'GOOD') {

		if ( is_null( $date ) ) {
			$date = $this->getLastReportDate();
		}

		$groups = $this->defaultGroups();

		$results = [];

		foreach (Enums::COMMUNICATION_WAY_TYPES as $wayType) {

			foreach ($groups as $groupKey => $groupTypes) {

				$available = $this->getAvailabilityForWayType(
					$date,
					$groupTypes,
					$status,
					$wayType
				)->count();

				$total = $this->getTotalCommunicationWaysByObjectiveTypeAndWayType($groupTypes, $wayType);

				$percent = $total > 0 ? ($available * 100) / $total : 0;

				$results[$groupKey][$wayType] = [
					'total' 			=> $total,
					'available' 	=> $available,
					'percentage' 	=> $percent
				];

			}

		}

		return $results;

	}

	/**
	 * Gets the communication ways for the given communication objective types
	 */
	public function getCommunicationWaysByObjectiveTypes(array $objectiveTypes) {

		$objectives = CommunicationWay
			::select(
				'communication_objectives.name',
				'communication_objectives.type as objective_type',
				'communication_ways.type as way_type'
			)
			->leftjoin(
				'communication_objectives',
				'communication_ways.communication_objective_id', '=', 'communication_objectives.id'
			)
			->whereIn('communication_objectives.type', $objectiveTypes)
			->get();

			return $objectives;

	}

	/**
	 * Gets the communication ways for the given objetive types and filtered by a
	 * specific communication way type
	 */
	public function getCommunicationWaysByObjectiveTypesAndWayType(array $objectiveTypes, string $wayType) {

		$objectives = CommunicationWay
			::select(
				'communication_objectives.name',
				'communication_objectives.type as objective_type',
				'communication_ways.type as way_type'
			)
			->leftjoin(
				'communication_objectives',
				'communication_ways.communication_objective_id', '=', 'communication_objectives.id'
			)
			->whereIn('communication_objectives.type', $objectiveTypes)
			->where('communication_ways.type', $wayType)
			->get();

			return $objectives;

	}

	/**
	 * Gets the total communication ways for the given objective types and filtered by the
	 * specified communication way type
	 */
	public function getTotalCommunicationWaysByObjectiveTypeAndWayType(array $objectiveTypes, string $wayType) {
		return $this->getCommunicationWaysByObjectiveTypesAndWayType($objectiveTypes, $wayType)->count();
	}

	/**
	 * Gets the communication reports made on a specific date for the given
	 * communication objective types
	 */
	public function getReportsByDateAndObjectiveTypes($date, $objectiveTypes) {

		$parsedDate = Carbon::parse($date);

		$query = CommunicationReport
			::select(
				'communication_reports.*',
				'communication_objectives.name as objective_name',
				'communication_objectives.type as objective_type',
				'communication_ways.type as way_type',
				'communication_ways.contact_number'
			)
			->leftjoin(
				'communication_objectives',
				'communication_reports.communication_objective_id', '=', 'communication_objectives.id'
			)
			->leftjoin(
				'communication_ways',
				'communication_reports.communication_way_id', '=', 'communication_ways.id'
			)
			->whereIn('communication_objectives.type', $objectiveTypes)
			->where('date', $parsedDate);

		return $query->get();

	}

	/**
	 * Get the availability of a given communication way type that meets the
	 * following criteria:
	 * - On the specified date
	 * - For the given commication objective types
	 * - With the given status
	 * - Of a specific communication way type
	 */
	public function getAvailabilityForWayType(
		string $date,
		array $objectiveTypes,
		string $status,
		string $wayType
	) {

		$reports = $this->getReportsByDateAndObjectiveTypes($date, $objectiveTypes)
			->where('status', $status)
			->where('way_type', $wayType);

		return $reports;

	}

	/**
	 * Get the date of the last report
	 */
	public function getLastReportDate() {
		return CommunicationReport::orderBy('date', 'DESC')->first()->date;
	}

	/**
	 * Default communication objetive groups
	 * This groups will be used when calculating percentages
	 */
	public function defaultGroups() {
		$groups = [
			'GENERATION' => [
				'BATTERY',
				'FUEL',
				'GEA',
			],

			'SUB_STATIONS' => [
				'SUB_STATION',
			],

			'DISTRIBUTIONS' => [
				'DISTRIBUTION'
			],

			'RENEWABLE_ENERGY' => [
				'SOLAR_PARK'
			]
		];

		return $groups;
	}

}
