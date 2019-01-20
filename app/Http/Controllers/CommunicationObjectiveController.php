<?php

namespace App\Http\Controllers;

use App\CommunicationObjective;
use Illuminate\Http\Request;

class CommunicationObjectiveController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$objectives = CommunicationObjective::all();
		foreach ($objectives as $obj) {
			$obj->communicationWays; // add child models
		}

		return $this->successResponse($objectives);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\CommunicationObjective  $communicationObjective
	 * @return \Illuminate\Http\Response
	 */
	public function show($id)
	{
		$communicationObjective = CommunicationObjective::find($id);

		if ($communicationObjective) {
			return $communicationObjective;
		} else {
			return $this->notFoundResponse();
		}
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\CommunicationObjective  $communicationObjective
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, CommunicationObjective $communicationObjective)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\CommunicationObjective  $communicationObjective
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		$communicationObjective = CommunicationObjective::find($id);

		if (!$communicationObjective) {
			return $this->notFoundResponse();
		}

		try {
			$communicationObjective->delete();
			return $this->successResponse(null, 204);
		} catch (\Exception $e) {
			return $this->errorResponse($e);
		}
	}
}
