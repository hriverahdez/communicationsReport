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

        return $objectives;
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
    public function show(CommunicationObjective $communicationObjective)
    {
        return $communicationObjective;
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
    public function destroy(CommunicationObjective $communicationObjective)
    {
        try {
            $communicationObjective->delete();
            return response()->json([ 'success' => true ], 204);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e
            ], 500);
        }
    }
}
