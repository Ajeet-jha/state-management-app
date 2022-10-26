import { useEffect, useState } from 'react';
import http from '../services/httpConfig';

function Header() {
	const [select, setSelect] = useState(-1);
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});

	const fetchUsers = async () => {
		const resp = await http.get('/users');
		setUsers(resp.data);
	};

	useEffect(() => {
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

	const handleUpdate = (e) => {
		const updatedName = e.target.value;
		setUser({ ...user, name: updatedName });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { id, name } = user;
		await http.put(`/users/${id}`, { name });
		fetchUsers();
		setUser({});
	};
	return (
		<header className="header">
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
			{Object.keys(user).length !== 0 && (
				<form onSubmit={handleSubmit}>
					<input type="text" value={user.id} disabled />
					<input type="text" value={user.name} onChange={handleUpdate} />
					<input type="submit" onClick={handleSubmit} />
				</form>
			)}
		</header>
	);
}

export default Header;
