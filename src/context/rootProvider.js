import { useState, useMemo } from 'react';
import { UserContext } from './rootContext';

function UserProvider({ children }) {
	const [value, setValue] = useState({});
	useMemo(() => {
		setValue({ test: 'abc' });
	}, [value]);
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider };
