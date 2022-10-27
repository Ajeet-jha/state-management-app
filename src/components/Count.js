import { useSelector } from 'react-redux';

function Count() {
	const { count } = useSelector((state) => ({ count: state.count }));

	return <div>Count is: {count}</div>;
}

export default Count;
