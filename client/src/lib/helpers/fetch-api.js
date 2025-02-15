// @ts-nocheck
import { getCookie } from './cookie';
// import { cookieNames } from '../configs';
const api = process.env.NEXT_PUBLIC_SERVICE_HOST;
import useUserStore from '../stores/auth';

export const handleError = (response, error) => {
	// If response exists it means HTTP error occured
	if (response) {
		// We are trying to parse response
		try {
			const parasedError = JSON.parse(error);
			return {
				status: response.status,
				headers: response.headers,
				error: {
					status: response.status,
					message: 'REQUEST_FAILED',
					...parasedError
				}
			};
		} catch (e) {
			return {
				status: response.status,
				headers: response.headers,
				error: {
					message: 'REQUEST_FAILED'
				}
			};
		}
	}
};

// API wrapper function
export const fetchApi = (url, userOptions = {}, userEventHandler = {}) => {
	const { user } = useUserStore.getState(); // Access the token from Zustand store

	// default eventHandler
	const defaultEventHandler = {
		has401Handler: true,
		enableProxy: true
	};
	const eventHandler = {
		...defaultEventHandler,
		...userEventHandler
	};

	// Define default options
	const defaultOptions = {};
	// Define default headers
	const defaultHeaders = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${getCookie('token')}`,
		'X-Consumer-Username': user.id || ''
	};

	const validUserOptions = {
		...userOptions
	};

	delete validUserOptions['thisFetch'];

	const options = {
		// Merge options
		...defaultOptions,
		...validUserOptions,
		// Merge headers
		headers: {
			...defaultHeaders,
			...userOptions.headers
		}
	};

	// **setup access token
	// const cid = getCookie('token') || '';
	// options.headers['apikey'] = cid;

	// Build the API URL
	let newUrl = `${api}${url}`;

	// seting up query params
	let queryParams = '';
	if (options.query && typeof options.query === 'object') {
		const { query } = options;
		queryParams = Object.keys(options.query)
			.map((key) => {
				const value = query[key];

				if (Array.isArray(value)) {
					return value
						.map((value) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
						.join('&');
				}

				return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
			})
			.join('&');
	}

	if (queryParams) newUrl = `${newUrl}?${queryParams}`;

	// Detect is we are uploading a file
	let isFile = false;
	if (options.body && options.body.constructor.name === 'FormData') {
		isFile = true;
		delete options.headers['Content-Type'];
	}

	// if (File) options.body instanceof File

	// Stringify JSON data
	// If body is not a file
	if (options.body && typeof options.body === 'object' && !isFile) {
		options.body = JSON.stringify(options.body);
	}

	// Variable which will be used for storing response
	let response = null;

	const fetchWrapper = userOptions.thisFetch ? userOptions.thisFetch : fetch;

	return (
		fetchWrapper(newUrl, options)
			.then((responseObject) => {
				// Saving response for later use in lower scopes
				response = responseObject;

				// Check for error HTTP error codes
				if (response.status < 200 || response.status >= 300) {
					// Get response as text
					return response.text();
				}

				// Get response as json
				// return response.json()
				return response.text();
			})
			// "parsedResponse" will be either text or javascript object depending if
			// "response.text()" or "response.json()" got called in the upper scope
			.then((parsedResponse) => {
				// Request succeeded
				// Hanle when response text is null
				// return parsedResponse ? JSON.parse(parsedResponse) : {}
				let data = parsedResponse ? JSON.parse(parsedResponse) : {};

				// HTTP unauthorized
				// Handle unauthorized requests
				// Maybe redirect to login page?
				// if data.code === 5002, it means name = UNAUTHORIZED_PERMISSION
				if (eventHandler.has401Handler && response.status === 401) {
					try {
						const { pathname, search } = window.location;
						const referrer = encodeURIComponent(`${pathname}${search}`);

						// window.location.href = `/login?referrer=${referrer}`
					} catch (err) {
						console.log('error => ', err);
					}
				}

				// Check for HTTP error codes
				if (response.status < 200 || response.status >= 300) {
					// Throw error
					// throw parsedResponse
					return handleError(response, parsedResponse);
				}

				// Request succeeded
				// Hanle when response text is null
				// return parsedResponse ? JSON.parse(parsedResponse) : {}
				// let data = parsedResponse ? JSON.parse(parsedResponse) : {}

				return {
					status: response.status,
					headers: response.headers,
					data: typeof data === 'object' ? data : parsedResponse
				};
			})
			.catch((error) => {
				return handleError(response, error);
			})
	);
};

export const reqLoading = () => ({
	loading: true,
	success: false,
	error: false,
	errorMsg: null
});

export const reqSuccess = () => ({
	loading: false,
	success: true,
	error: false,
	errorMsg: null
});

export const reqError = (payload) => ({
	loading: false,
	success: false,
	error: true,
	errorMsg: payload.error
});
