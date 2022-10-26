import { useEffect, useState } from 'react';
import { fetchUsers, fetchUser } from '../services/Api';

function LeftSide() {
	const [select, setSelect] = useState(-1);
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState([]);

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

	const handleSelect = (e) => {
		const selected = e.target.value;
		setSelect(selected);
		if (selected > 0) {
			findUser(selected);
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
