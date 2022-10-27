/*  eslint-disable  arrow-body-style */

export const increment = () => {
	return async (dispatch) => {
		await setTimeout(() => {
			dispatch({ type: 'INC' });
		}, 2000);
	};
};

export const decrement = () => {
	return async (dispatch) => {
		await setTimeout(() => {
			dispatch({ type: 'DEC' });
		}, 3000);
	};
};
