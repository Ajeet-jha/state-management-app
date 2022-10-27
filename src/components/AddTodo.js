import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/actions';

function AddTodo() {
	const [input, setInput] = useState('');
	const dispatch = useDispatch();

	return (
		<div>
			<input onChange={(e) => setInput(e.target.value)} value={input} />
			<button className="add-todo" onClick={() => dispatch(addTodo(input))}>
				Add Todo
			</button>
		</div>
	);
}

export default AddTodo;
