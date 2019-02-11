export const removeTimeFromDate = (date: Date) => {
	const newDate = new Date(date);
	newDate.setHours(0);
	newDate.setMinutes(0);
	newDate.setSeconds(0);
	newDate.setMilliseconds(0);
	return newDate;
};

export const parseDate = (dateString: string) => {
	const [year, month, date] = dateString.split('-');
	return new Date(+year, +month - 1, +date);
};
