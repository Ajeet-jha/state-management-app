import { useState, useContext } from 'react';
import { UserContext } from '../context/rootContext';
import { deleteUser } from '../services/Api';

function Footer() {
	const [select, setSelect] = useState(-1);
	const { users, getAllUsers } = useContext(UserContext);

	const handleSelect = async (e) => {
		const selected = e.target.value;
		setSelect(selected);
		if (selected > 0) {
			await deleteUser({
				url: `/users/${selected}`,
				method: 'DELETE',
			});
			getAllUsers();
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
