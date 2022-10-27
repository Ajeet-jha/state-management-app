import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/rootContext';

function Header() {
	const [select, setSelect] = useState(-1);
	const [user, setUser] = useState({});
	const {
		state: { users, update, user: data },
		getUser,
		updateUserData,
	} = useContext(UserContext);

	useEffect(() => {
		setUser(update);
	}, [update]);

	useEffect(() => {
		setSelect(-1);
	}, [data]);

	const handleSelect = async (e) => {
		const selected = e.target.value;
		setSelect(selected);
		if (selected > 0) {
			await getUser(selected, 'UPDATE_USER');
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
		await updateUserData(user);
		setUser({});
		setSelect(-1);
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
