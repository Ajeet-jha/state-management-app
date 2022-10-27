import { useEffect, useMemo, useReducer } from 'react';
import { UserContext } from './rootContext';
import { fetchUsers, fetchUser, updateUser, deleteUser } from '../services/Api';

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
			case 'UPDATE_USER':
				return {
					...state,
					update: action.payload,
				};
			case 'DELETE_USER':
				return {
					...state,
					update: action.payload,
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
		getAllUsers();
	};

	const updateUserData = async ({ id, name }) => {
		await updateUser({
			url: `/users/${id}`,
			method: 'PUT',
			data: { name },
		});
		getAllUsers();
	};

	const deleteUserData = async (selected) => {
		await deleteUser({
			url: `/users/${selected}`,
			method: 'DELETE',
		});
		getAllUsers();
	};

	const usersProviderValue = useMemo(
		() => ({
			state,
			dispatch,
			getAllUsers,
			getUser,
			updateUserData,
			deleteUserData,
		}),
		[state, dispatch, getAllUsers, getUser, updateUserData, deleteUserData]
	);

	return (
		<UserContext.Provider value={usersProviderValue}>
			{children}
		</UserContext.Provider>
	);
}

export { UserProvider };
