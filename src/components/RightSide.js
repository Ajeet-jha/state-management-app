import { useEffect, useState } from 'react';
import http from '../services/httpConfig';

function RightSide() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const resp = await http.get('/users');
			setUsers(resp.data);
		};
		fetchUsers();
	}, []);

	return (
		<section className="right-side">
			<ul>
				{users.map(({ id, name }) => (
					<li key={id}>
						{id} {name}
					</li>
				))}
			</ul>
		</section>
	);
}

export default RightSide;
