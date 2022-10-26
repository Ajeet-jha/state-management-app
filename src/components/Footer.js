import { useEffect, useState } from 'react';
import http from '../services/httpConfig';

function Footer() {
	const [select, setSelect] = useState(-1);
	const [users, setUsers] = useState([]);

	const fetchUsers = async () => {
		const resp = await http.get('/users');
		setUsers(resp.data);
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const handleSelect = async (e) => {
		const selected = e.target.value;
		setSelect(selected);
		if (selected > 0) {
			await http.delete(`/users/${selected}`);
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
