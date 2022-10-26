import { useEffect, useState, useContext } from 'react';
import { fetchUsers, fetchUser } from './services/Api';
import { UserContext } from './context/rootContext';

import * as Components from './components';

function App() {
	const [users, setUsers] = useState([]);
	const [name, setName] = useState('');
	const [response, setResponse] = useState('');
	const context = useContext(UserContext);
	console.log(context);

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
			<Components.Footer users={users} getAllUsers={getAllUsers} />
		</section>
	);
}

export default App;
// http://localhost:8080/users
