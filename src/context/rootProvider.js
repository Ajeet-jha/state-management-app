import { useEffect, useMemo, useReducer } from 'react';
import { UserContext } from './rootContext';
import { fetchUsers } from '../services/Api';

const intialState = {
	users: [],
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

	// const getUser = async (id) => {
	//     const userResp = await fetchUser({
	//         url: `/users/${id}`,
	//         method: 'GET',
	//     });
	//     return userResp;
	// };

	const usersProviderValue = useMemo(
		() => ({ state, dispatch, getAllUsers }),
		[state, dispatch, getAllUsers]
	);

	return (
		<UserContext.Provider value={usersProviderValue}>
			{children}
		</UserContext.Provider>
	);
}

export { UserProvider };
