/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			aspectRatio: {
				"19/12": "19 / 12",
				"12/18": "12 / 18",
				"12/19": "12 / 19",
				"9/16": "9 / 16",
				"9/14": "9 / 14",
			},
		},
	},
	plugins: [],
};
