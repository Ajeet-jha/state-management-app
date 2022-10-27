import React from 'react';
import cx from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../redux/actions';
import { VISIBILITY_FILTERS } from '../constants';

function VisibilityFilters() {
	const activeFilter = useSelector((state) => state.visibilityFilter);
	const dispatch = useDispatch();
	return (
		<div className="visibility-filters">
			{Object.keys(VISIBILITY_FILTERS).map((filterKey) => {
				const currentFilter = VISIBILITY_FILTERS[filterKey];
				return (
					<span
						key={`visibility-filter-${currentFilter}`}
						className={cx(
							'filter',
							currentFilter === activeFilter && 'filter--active'
						)}
						onClick={() => {
							console.log('setting', currentFilter);
							dispatch(setFilter(currentFilter));
						}}
					>
						{currentFilter}
					</span>
				);
			})}
		</div>
	);
}

export default VisibilityFilters;
