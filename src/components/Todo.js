import React from 'react';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
// import { getTodoById } from "../redux/selectors";
import { toggleTodo } from '../redux/actions';

function Todo({ todo }) {
	const dispatch = useDispatch();
	return (
		<li className="todo-item" onClick={() => dispatch(toggleTodo(todo.id))}>
			{todo && todo.completed ? '👌' : '👋'}{' '}
			<span
				className={cx(
					'todo-item__text',
					todo && todo.completed && 'todo-item__text--completed'
				)}
			>
				{todo.content}
			</span>
		</li>
	);
}

export default Todo;
