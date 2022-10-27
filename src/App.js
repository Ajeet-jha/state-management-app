import { useDispatch } from 'react-redux';
import { increment, decrement } from './store/actions';
import Count from './components/Count';

function App() {
	const dispatch = useDispatch();

	return (
		<div className="App">
			<Count />
			<button onClick={() => dispatch(increment())}>Increment</button>
			<button onClick={() => dispatch(decrement())}>Decrement</button>
		</div>
	);
}

export default App;
