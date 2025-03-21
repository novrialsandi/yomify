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
			},

			animation: {
				wiggle: "wiggle 1s ease-in-out infinite",
			},
			keyframes: {
				wiggle: {
					"0%, 100%": { transform: "rotate(-10deg)" },
					"50%": { transform: "rotate(10deg)" },
				},
			},
		},
	},
	plugins: [],
};
