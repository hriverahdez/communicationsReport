<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommunicationObjective extends Model
{
	protected $fillable = [
		'name',
		'type'
    ];

    public function communicationWays()
    {
        return $this->hasMany(CommunicationWay::class, 'communication_objective_id');
    }
}
