/**
 * Generates a unique ID of a specified length.
 *
 * @param {number} length The length of the ID to generate. Defaults to 12
 * @returns {string} The generated unique ID.
 */
export function generateUniqueId(length = 12) {
	const chars =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	let id = '';

	for (let i = 0; i < length; i++) {
		id += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return id;
}
