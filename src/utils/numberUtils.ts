export const getRandomInt = (min: number, max: number): number => {
	const minCeil = Math.ceil(min);
	const maxFloor = Math.floor(max) + 1;

	return Math.floor(Math.random() * (maxFloor - minCeil)) + minCeil;
};

export const isNumber = (value: string): boolean => {
	// Date formats, such as 'yyyy-MM-dd' pass through the "parseInt" and return just the 'yyyy' portion.
	// We need a way to handle these values, such as checking for any alpha characters and early returning.
	// After, we can fallback to checking if the parseInt returns a NaN just to be safe.
	const nonNumberCharacter: RegExp = RegExp("[^\\d]");

	if (value.match(nonNumberCharacter)) {
		return false;
	}

	return !isNaN(parseInt(String(value)));
};
