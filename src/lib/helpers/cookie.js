// @ts-nocheck
import Cookie from 'cookie-universal';

const cookies = Cookie();

export const getCookie = (cookieName) => {
	return cookies.get(cookieName);
};

export const setCookie = (cookieName, value) => {
	// await cookies.set(cookieName, payload, { path: '/', domain: cookieNames.domain })
	return cookies.set(cookieName, value);
};

export const removeCookie = async (cookieName) => {
	cookies.remove(cookieName);
};
