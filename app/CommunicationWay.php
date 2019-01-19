<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommunicationWay extends Model
{
	protected $fillable = [
		'type',
		'contact_number',
		'communication_objective_id'
    ];

    public function communicationObjective()
    {
        return $this->belongsTo(CommunicationObjective::class, 'communication_objective_id');
    }
}
