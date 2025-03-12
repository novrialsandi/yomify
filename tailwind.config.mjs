/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			aspectRatio: {
				"19/12": "19 / 12",
			},
		},
	},
	plugins: [],
};
