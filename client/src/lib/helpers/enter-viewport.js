// @ts-nocheck
const options = { threshold: 0.75 };
let intersectionObserver;

function initIntersectionObserver() {
	if (intersectionObserver) return;

	intersectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const eventName = entry.isIntersecting
				? 'enterViewport'
				: 'exitViewport';
			entry.target.dispatchEvent(new CustomEvent(eventName));
		});
	}, options);
}

export function enterViewport(node) {
	initIntersectionObserver();

	intersectionObserver.observe(node);

	return {
		destroy() {
			intersectionObserver.unobserve(node);
		}
	};
}
