<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\StatsService;
use Illuminate\Support\Facades\Input;

class StatsController extends Controller
{

	public function getDailyStats(StatsService $statsService) {
		$date = null;
		if (Input::get('date')) {
			$date = Input::get('date');
		}

		$results = $statsService->getCommunicationWaysDailyAvailability($date);

		return $this->successResponse($results);
	}

	public function getGroupsTotalAvailability(StatsService $statsService) {
		$results = $statsService->getGeneralGroupsAvailability();
		return $this->successResponse($results);
	}

}
