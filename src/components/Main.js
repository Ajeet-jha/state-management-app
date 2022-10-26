import { postUser } from '../services/Api';

function Main({ name, setName, response, setResponse, getAllUsers }) {
	const handleSubmit = async (e) => {
		e.preventDefault();

		const resp = await postUser({
			url: '/users',
			method: 'POST',
			data: { name },
		});

		setResponse(resp);
		setName('');
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
