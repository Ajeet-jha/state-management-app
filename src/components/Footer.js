import { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../services/Api';

function Footer() {
	const [select, setSelect] = useState(-1);
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

	const handleSelect = async (e) => {
		const selected = e.target.value;
		setSelect(selected);
		if (selected > 0) {
			await deleteUser({
				url: `/users/${selected}`,
				method: 'DELETE',
			});
		}
	};

	return (
		<footer className="footer">
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
		</footer>
	);
}

export default Footer;
