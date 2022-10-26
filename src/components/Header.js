import { useState, useContext } from 'react';
import { UserContext } from '../context/rootContext';
import { updateUser } from '../services/Api';

function Header() {
	const [select, setSelect] = useState(-1);
	const [user, setUser] = useState({});
	const { users, getUser, getAllUsers } = useContext(UserContext);

	const handleSelect = async (e) => {
		const selected = e.target.value;
		setSelect(selected);
		if (selected > 0) {
			const resp = await getUser(selected);
			setUser(resp);
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
			{user && Object.keys(user).length !== 0 && (
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
