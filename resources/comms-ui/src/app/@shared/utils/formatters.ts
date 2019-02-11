export const formatCommObjectiveType = (type: string) => {
	const dictionary = {
		BATTERY: 'Batería',
		FUEL: 'Fuel',
		GEA: 'GEA',
		DISTRIBUTION: 'Posición de distribución',
		SOLAR_PARK: 'Parque solar fotovoltaico',
		SUB_STATION: 'Sub-estación'
	};
	return dictionary[type] || '---';
};

export const formatWayType = (type: string) => {
	const dictionary = {
		TRUNKING: 'Trunking',
		FM: 'FM',
		INTERNAL_PHONE: 'Teléfono interno',
		EXTERNAL_PHONE: 'Teléfono ETETCSA',
		CELLPHONE: 'Celular'
	};

	return dictionary[type] || '---';
};

export const formatReportStatus = status => {
	const statuses = {
		GOOD: 'Bien',
		REGULAR: 'Regular',
		BAD: 'Mal'
	};

	return statuses[status] || '---';
};
