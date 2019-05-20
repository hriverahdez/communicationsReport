<?php

namespace App\Http\Controllers;

use App\CommunicationReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use App\CommunicationObjective;
use App\CommunicationWay;
use App\Services\StatsService;
use App\Enums;
use Carbon\Carbon;
use App\CommunicationReportRequest;

class CommunicationReportController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
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
				'communication_reports.communication_objective_id',
				'=',
				'communication_objectives.id'
			)
			->leftjoin(
				'communication_ways',
				'communication_reports.communication_way_id',
				'=',
				'communication_ways.id'
			)
			->orderBy('communication_reports.date', 'DESC')
			->get();

		$data = $query->groupBy(['date', 'communication_objective_id']);
		return $this->successResponse($data);
	}

	public function latestReports()
	{

		$timezone = env('TIMEZONE', 'UTC');

		// Query for the lastest report
		$lastestReportDateQuery = CommunicationReport
			::select('communication_reports.*', 'communication_objectives.type as objective_type')
			->leftjoin(
				'communication_objectives',
				'communication_reports.communication_objective_id',
				'=',
				'communication_objectives.id'
			);

		// Filter by objective types (from querystring)
		$types = [];
		if (Input::get('types')) {
			$types = explode(',', Input::get('types'));
			$lastestReportDateQuery->whereIn('communication_objectives.type', $types);
		}
			
		// Get the lastest reports and only use the first one since we are only
		// interested in the date (sorted descendingly to get the most recent one)
		$data = $lastestReportDateQuery->get()
			->sortByDesc('date')			
			->first();

		// Falback date is today in case no reports have been made for the types 
		// sent in the request
		$lastestReportDate = Carbon::today($timezone);

		
		// If a report was found
		if (!is_null($data)) {
			$lastestReportDate = Carbon::parse($data->date);
			
			// Compare that report's date to today.
			// If the dates match then a report for the type(s) has been already made
			if (Carbon::today()->setTimezone($timezone)->isSameDay($lastestReportDate)) {			
				return $this->errorResponse("Today's report has already been created", 400);
			}
		}

		$query = CommunicationWay
			::select(
				'communication_reports.*',
				'communication_objectives.id as communication_objective_id',
				'communication_objectives.name as objective_name',
				'communication_objectives.type as objective_type',
				'communication_ways.id as communication_way_id',
				'communication_ways.type as way_type',
				'communication_ways.contact_number',
				'communication_ways.active'
			)			
			->leftjoin(
				'communication_objectives',
				'communication_ways.communication_objective_id',
				'=',
				'communication_objectives.id'
			)
			->leftjoin(
				'communication_reports',
				'communication_reports.communication_way_id',
				'=',
				'communication_ways.id'
			);
			
		$query
			->where(function($query) use($lastestReportDate, $types) {
				$query
					->where('date', '=', $lastestReportDate)
					->where('communication_ways.active', 1)
					->whereIn('communication_objectives.type', $types);
			})
			->orWhere(function($query) use($types) {
				$query
					->where('date', '=', null)
					->where('communication_ways.active', 1)
					->whereIn('communication_objectives.type', $types);
			});

		// if (Input::get('types')) {
		// 	$types = explode(',', Input::get('types'));
		// 	$query->whereIn('communication_objectives.type', $types);
		// }

		// Find all pending requests that were accepted before their report
		// was created
		$acceptedRequests = CommunicationReportRequest
			::where('request_status', 'ACCEPTED_BEFORE_REPORT')
			->get();
		
		$data = $query->get();

		// For every report request
		foreach ($acceptedRequests as $reportRequest) {
			
			$objectiveId = $reportRequest->communication_objective_id;
			$wayId = $reportRequest->communication_way_id;

			// Try to find the report that the request is referencing
			$report = $data->first(
				function($value) use($objectiveId, $wayId) {
					return (
						$value->communication_objective_id == $objectiveId
						&& $value->communication_way_id == $wayId
					);
				}
			);

			// Overwrite the report's data (which would be that of its previous day)
			// with the data from the report request that was accepted and thus 
			// takes precedence and is considered more recent
			if ($report) {
				$report->updated_from_request = true;
				$report->updated_from_request_date = Carbon::today($timezone);
				$report->details = $reportRequest->details;
				$report->status = $reportRequest->status;				
			}
			
		}
		
		return $this->successResponse($data->groupBy(['communication_objective_id']));
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		$reports = $request->all();

		try {

			foreach ($reports as $report) {
				CommunicationReport::create($report);

				// Try to find a previously made request that was handled in the
				// report being created
				$reportRequest = CommunicationReportRequest
					::where('request_status', 'ACCEPTED_BEFORE_REPORT')
					->where('communication_objective_id', $report['communication_objective_id'])
					->where('communication_way_id', $report['communication_way_id'])
					->first();
				
				// If found change its status so it won't be processed twice
				if ($reportRequest) {					
					$reportRequest->request_status = 'FINALIZED';
					$reportRequest->save();
				}
			}

			return $this->successResponse(
				$this->latestReports()
			);
		} catch (\Exception $e) {
			return $this->errorResponse(null, 500, $e);
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\CommunicationReport  $communicationReport
	 * @return \Illuminate\Http\Response
	 */
	public function show(CommunicationReport $communicationReport)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\CommunicationReport  $communicationReport
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, CommunicationReport $communicationReport)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\CommunicationReport  $communicationReport
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(CommunicationReport $communicationReport)
	{
		//
	}
}
