import { useEffect, useState } from 'react';
import { fetchUsers, fetchUser } from './services/Api';

import * as Components from './components';

function App() {
	const [select, setSelect] = useState(-1);
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState([]);

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

	const findUser = async (id) => {
		const getUser = async () => {
			const userResp = await fetchUser({
				url: `/users/${id}`,
				method: 'GET',
			});
			setUser(userResp);
		};
		getUser();
	};

	return (
		<section>
			<Components.Header />
			<Components.LeftSide
				select={select}
				setSelect={setSelect}
				user={user}
				setUser={setUser}
				users={users}
				setUsers={setUsers}
				findUser={findUser}
			/>
			<Components.Main
				name={name}
				setName={setName}
				response={response}
				setResponse={setResponse}
				getAllUsers={getAllUsers}
			/>
			<Components.RightSide />
			<Components.Footer />
		</section>
	);
}

export default App;
// http://localhost:8080/users
