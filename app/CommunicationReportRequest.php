<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommunicationReportRequest extends Model
{
	protected $fillable = [
		'status',
		'details',
		'date',
		'request_status',
		'communication_objective_id',
		'communication_way_id',
	];

	public function communicationObjective()
	{
		return $this->belongsTo(CommunicationObjective::class, 'communication_objective_id');
	}

	public function communicationWay()
	{
		return $this->belongsTo(CommunicationWay::class, 'communication_way_id');
	}
}
