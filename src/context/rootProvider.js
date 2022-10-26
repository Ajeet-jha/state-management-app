import { useState, useEffect, useMemo } from 'react';
import { UserContext } from './rootContext';
import { fetchUsers, fetchUser } from '../services/Api';

function UserProvider({ children }) {
	// const [value, setValue] = useState({});
	const [users, setUsers] = useState([]);
	const [name, setName] = useState('');
	const [response, setResponse] = useState('');

	const getAllUsers = async () => {
		const resp = await fetchUsers({
			url: '/users',
			method: 'GET',
		});
		setUsers(resp);
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
			users,
			setUsers,
			name,
			setName,
			response,
			setResponse,
			getAllUsers,
			getUser,
		}),
		[
			users,
			setUsers,
			name,
			setName,
			response,
			setResponse,
			getAllUsers,
			getUser,
		]
	);

	return (
		<UserContext.Provider value={usersProviderValue}>
			{children}
		</UserContext.Provider>
	);
}

export { UserProvider };
