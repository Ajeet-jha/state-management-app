import http from './httpConfig';

//  http://localhost:8080/users
export const fetchUsers = async ({ url, method }) => {
	const resp = await http({
		url,
		method,
	});
	return resp.data;
};

// http://localhost:8080/users/:id
export const fetchUser = async ({ url, method }) => {
	const resp = await http({
		url,
		method,
	});
	return resp.data;
};

// http://localhost:8080/users
export const postUser = async ({ url, method, data }) => {
	const resp = await http({
		url,
		method,
		data,
	});
	return resp.data;
};

// http://localhost:8080/users/:id
export const updateUser = async ({ url, method, data }) => {
	const resp = await http({
		url,
		method,
		data,
	});
	return resp.data;
};

// http://localhost:8080/users/:id
export const deleteUser = async ({ url, method }) => {
	const resp = await http({
		url,
		method,
	});
	return resp.data;
};
