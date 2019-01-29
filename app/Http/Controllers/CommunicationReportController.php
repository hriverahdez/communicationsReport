<?php

namespace App\Http\Controllers;

use App\CommunicationReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

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
									// 'communication_objectives.id as objective_id',
									'communication_objectives.name as objective_name',
									'communication_objectives.type as objective_type',
									// 'communication_ways.id as way_id',
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
								->get();

			$data = $query->groupBy(['communication_objective_id', 'date']);
			return $this->successResponse($data);
		}

		public function latestReports()
    {
			$query = CommunicationReport
								::select(
									'communication_reports.*',
									// 'communication_objectives.id as objective_id',
									'communication_objectives.name as objective_name',
									'communication_objectives.type as objective_type',
									// 'communication_ways.id as way_id',
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
								);

			if (Input::get('types')) {
				$types = explode(',', Input::get('types'));
				$query->whereIn('communication_objectives.type', $types);
			}

			$data = $query->get()
									->sortByDesc('date')
									->groupBy(['date', 'objective_name'])
									->first();

			return $this->successResponse($data);
		}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
			$objectives = $request->all();

			try {

				foreach ($objectives as $key => $communicationWayReports) {
					foreach ($communicationWayReports as $report) {
						CommunicationReport::create($report);
					}
				}

				return $this->successResponse(
					$this->latestReports()
				);

			} catch (\Exception $e) {
				return $this->errorResponse($e);
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
