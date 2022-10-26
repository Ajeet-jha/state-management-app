import { useContext } from 'react';
import { UserContext } from '../context/rootContext';

function RightSide() {
	const {
		state: { users },
	} = useContext(UserContext);

	return (
		<section className="right-side">
			<ul>
				{users.map(({ id, name }) => (
					<li key={id}>{name}</li>
				))}
			</ul>
		</section>
	);
}

export default RightSide;
