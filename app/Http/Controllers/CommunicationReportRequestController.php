<?php

namespace App\Http\Controllers;

use App\CommunicationReportRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\CommunicationReport;
use Carbon\Carbon;

class CommunicationReportRequestController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{ 
		
		$query = CommunicationReportRequest
			::select(
				'communication_report_requests.*',
				'communication_objectives.name as objective_name',
				'communication_objectives.type as objective_type',
				'communication_ways.id as communication_way_id',
				'communication_ways.type as way_type',
				'communication_ways.contact_number'
			)
			->leftjoin(
				'communication_objectives',
				'communication_report_requests.communication_objective_id',
				'=',
				'communication_objectives.id'
			)
			->leftjoin(
				'communication_ways',
				'communication_report_requests.communication_way_id',
				'=',
				'communication_ways.id'
			);
		
		// Filter by status (from querystring)
		if (Input::get('status')) {
			$query->where('communication_report_requests.request_status', Input::get('status'));
		}

		return $this->successResponse($query->get());
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		try {
			$created = CommunicationReportRequest::create($request->all());
			return $this->successResponse($created);			
		} catch (\Exception $e) {
			return $this->errorResponse(null, 500, $e);
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\CommunicationReportRequest  $communicationReportRequest
	 * @return \Illuminate\Http\Response
	 */
	public function show(CommunicationReportRequest $communicationReportRequest)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\CommunicationReportRequest  $communicationReportRequest
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, CommunicationReportRequest $communicationReportRequest)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\CommunicationReportRequest  $communicationReportRequest
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(CommunicationReportRequest $communicationReportRequest)
	{
		//
	}

	public function acceptRequest($id) {
		$timezone = env('TIMEZONE', '-05:00');
		$reportRequest = CommunicationReportRequest::find($id);

		if (!$reportRequest) {
			return $this->errorResponse('Report request not found', 404);
		}

		if ($reportRequest->request_status != 'PENDING') {
			return $this->errorResponse('That request has already been processed', 400);
		}

		$latestReportDate = Carbon::parse(
			CommunicationReport
				::all()
				->sortByDesc('date')
				->first()
				->date, 
			$timezone
		);

		// Report has been done
		if (Carbon::today()->setTimezone($timezone)->isSameDay($latestReportDate)) {			
			
			$report = CommunicationReport
				::where('communication_objective_id', $reportRequest->communication_objective_id)
				->where('communication_way_id', $reportRequest->communication_way_id)
				->where('date', $latestReportDate)
				->first();

			if (!is_null($report)) {
				$report->details = $reportRequest->details;
				$report->status = $reportRequest->status;
				$report->save();
				$reportRequest->request_status = 'FINALIZED';
				$reportRequest->save();

				return $this->successResponse($reportRequest, 201);
			} else {
				return $this->errorResponse('There was an error while trying to approve the request', 500);
			}
		} else {
			$reportRequest->request_status = 'ACCEPTED_BEFORE_REPORT';
			$reportRequest->save();

			return $this->successResponse($reportRequest, 201);
		}

		return $latestReportDate;
	}

	public function rejectRequest($id) {
		$reportRequest = CommunicationReportRequest::find($id);

		if (!$reportRequest) {
			return $this->errorResponse('Report request not found', 404);
		}

		if ($reportRequest->request_status != 'PENDING') {
			return $this->errorResponse('That request has already been processed', 400);
		}

		$reportRequest->request_status = 'REJECTED';
		$reportRequest->save();
	}
}
