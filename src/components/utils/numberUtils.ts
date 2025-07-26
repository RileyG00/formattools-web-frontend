export const getRandomInt = (min: number, max: number): number => {
	const minCeil = Math.ceil(min);
	const maxFloor = Math.floor(max) + 1;

	return Math.floor(Math.random() * (maxFloor - minCeil)) + minCeil;
};
