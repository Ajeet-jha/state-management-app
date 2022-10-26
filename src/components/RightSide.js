import { useEffect, useState } from 'react';
import { fetchUsers } from '../services/Api';

function RightSide() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const getAllUsers = async () => {
			const resp = await fetchUsers({
				url: '/users',
				method: 'GET',
			});
			setUsers(resp);
		};
		getAllUsers();
	}, []);

	return (
		<section className="right-side">
			<ul>
				{users.map(({ id, name }) => (
					<li key={id}>{name}</li>
				))}
			</ul>
		</section>
	);
}

export default RightSide;
