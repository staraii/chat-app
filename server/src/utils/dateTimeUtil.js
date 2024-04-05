function dateTimeUtil() {
	// Ger aktuell tid och datum, format: 2024-03-19 14:00:00
	const now = new Intl.DateTimeFormat("sv-Se", {
		dateStyle: "short",
		timeStyle: "medium",
	}).format(new Date());
	const splitNow = now.split(" ");
	// [0] = datum(2024-03-19), [1] = tid(14:00:00)
	const date = splitNow[0];
	const time = splitNow[1];
	return { date, time, now };
}


export default dateTimeUtil;
