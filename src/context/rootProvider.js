import { useState, useEffect, useMemo, useReducer } from 'react';
import { UserContext } from './rootContext';
import { fetchUsers, fetchUser } from '../services/Api';

const intialState = {
	users: [],
	name: '',
	response: '',
};

function UserProvider({ children }) {
	// const [users, setUsers] = useState([]);
	const [name, setName] = useState('');
	const [response, setResponse] = useState('');

	const reducer = (state, action) => {
		switch (action.type) {
			case 'FATCH_ALL_USERS':
				return {
					...state,
					users: action.payload,
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
		// setUsers(resp);
		dispatch({ type: 'FATCH_ALL_USERS', payload: resp });
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	const getUser = async (id) => {
		const userResp = await fetchUser({
			url: `/users/${id}`,
			method: 'GET',
		});
		return userResp;
	};

	const usersProviderValue = useMemo(
		() => ({
			// users,
			// setUsers,
			name,
			setName,
			response,
			setResponse,
			getAllUsers,
			getUser,
			state,
		}),
		[
			// users,
			// setUsers,
			name,
			setName,
			response,
			setResponse,
			getAllUsers,
			getUser,
			state,
		]
	);

	return (
		<UserContext.Provider value={usersProviderValue}>
			{children}
		</UserContext.Provider>
	);
}

export { UserProvider };
