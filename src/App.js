import { useEffect, useState } from 'react';
import { fetchUsers, fetchUser } from './services/Api';

import * as Components from './components';

function App() {
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

	return (
		<section>
			<Components.Header
				users={users}
				getUser={getUser}
				getAllUsers={getAllUsers}
			/>
			<Components.LeftSide users={users} getUser={getUser} />
			<Components.Main
				name={name}
				setName={setName}
				response={response}
				setResponse={setResponse}
				getAllUsers={getAllUsers}
			/>
			<Components.RightSide users={users} />
			<Components.Footer />
		</section>
	);
}

export default App;
// http://localhost:8080/users
