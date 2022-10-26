import { useContext, useState } from 'react';
import { UserContext } from '../context/rootContext';
import { postUser } from '../services/Api';

function Main() {
	const [name, setName] = useState('');
	const [response, setResponse] = useState('');
	const { dispatch, getAllUsers } = useContext(UserContext);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const resp = await postUser({
			url: '/users',
			method: 'POST',
			data: { name },
		});

		setResponse(resp);
		setName('');
		dispatch({ type: 'USER_ADDED' });
		getAllUsers();
	};

	return (
		<main className="main">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input type="submit" onClick={handleSubmit} />
			</form>
			{response && <pre>{JSON.stringify(response, null, 2)}</pre>}
		</main>
	);
}

export default Main;
