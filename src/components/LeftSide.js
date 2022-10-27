import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/rootContext';

function LeftSide() {
	const {
		state: { users, user, update },
		getUser,
	} = useContext(UserContext);
	const [select, setSelect] = useState(-1);

	useEffect(() => {
		setSelect(-1);
	}, [update]);

	const handleSelect = async (e) => {
		const selected = e.target.value;
		setSelect(selected);
		if (selected > 0) {
			await getUser(selected, 'DISPLAY_USER');
		} else {
			setSelect(-1);
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
