import { useEffect, useState } from 'react';
import http from '../services/httpConfig';

function LeftSide() {
	const [select, setSelect] = useState(-1);
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const resp = await http.get('/users');
			setUsers(resp.data);
		};
		fetchUsers();
	}, []);

	const fetchUser = async (id) => {
		const userResp = await http.get(`/users/${id}`);
		setUser(userResp.data);
	};

	const handleSelect = (e) => {
		const selected = e.target.value;
		setSelect(selected);
		if (selected > 0) {
			fetchUser(selected);
		} else {
			setUser([]);
		}
	};

	return (
		<section className="left-side">
			<label htmlFor="select-user">
				<select id="select-user" value={select} onChange={handleSelect}>
					<option value={-1}>Choose user</option>
					{users.map(({ id, name }) => (
						<option key={id} value={id}>
							{name}
						</option>
					))}
				</select>
			</label>
			<pre>{JSON.stringify(user, null, 2)}</pre>
		</section>
	);
}

export default LeftSide;
