function RightSide({ users }) {
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
