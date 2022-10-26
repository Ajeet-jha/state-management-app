import { useEffect, useMemo, useReducer } from 'react';
import { UserContext } from './rootContext';
import { fetchUsers, fetchUser, updateUser } from '../services/Api';

const intialState = {
	users: [],
	user: {},
	update: {},
};

function UserProvider({ children }) {
	const reducer = (state, action) => {
		switch (action.type) {
			case 'FATCH_ALL_USERS':
				return {
					...state,
					users: action.payload,
				};
			case 'USER_ADDED':
				return {
					...state,
				};
			case 'DISPLAY_USER':
				return {
					...state,
					user: action.payload,
				};

			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, intialState);

	const getAllUsers = async () => {
		const resp = await fetchUsers({
			url: '/users',
			method: 'GET',
		});

		dispatch({ type: 'FATCH_ALL_USERS', payload: resp });
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	const getUser = async (id, type) => {
		const userResp = await fetchUser({
			url: `/users/${id}`,
			method: 'GET',
		});

		dispatch({ type, payload: userResp });
	};

	const updateUserData = async ({ id, name }) => {
		await updateUser({
			url: `/users/${id}`,
			method: 'PUT',
			data: { name },
		});
		getAllUsers();
	};

	const usersProviderValue = useMemo(
		() => ({ state, dispatch, getAllUsers, getUser, updateUserData }),
		[state, dispatch, getAllUsers, getUser, updateUserData]
	);

	return (
		<UserContext.Provider value={usersProviderValue}>
			{children}
		</UserContext.Provider>
	);
}

export { UserProvider };
