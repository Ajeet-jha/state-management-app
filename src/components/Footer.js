import FilterLink from '../containers/FilterLink';
import { VisibilityFilters } from '../store/actions';

function Footer() {
	return (
		<div>
			<FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
			<FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
			<FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>
				Completed
			</FilterLink>
		</div>
	);
}

export default Footer;
