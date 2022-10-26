import { useEffect, useState } from 'react';
import { fetchUsers, fetchUser, updateUser } from '../services/Api';

function Header() {
	const [select, setSelect] = useState(-1);
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});

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

	const handleSelect = (e) => {
		const selected = e.target.value;
		setSelect(selected);
		if (selected > 0) {
			findUser(selected);
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
		await updateUser({
			url: `/users/${id}`,
			method: 'PUT',
			data: { name },
		});
		getAllUsers();
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
