import { useState } from 'react';
import { postUser } from '../services/Api';

function Main() {
	const [name, setName] = useState('');
	const [response, setResponse] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const resp = await postUser({
			url: '/users',
			method: 'POST',
			data: { name },
		});

		setResponse(resp);
		setName('');
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
