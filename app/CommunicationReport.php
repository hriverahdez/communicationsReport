<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommunicationReport extends Model
{
	protected $fillable = [
		'status',
		'details',
		'date',
		'updated_from_request',
		'updated_from_request_date',
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
