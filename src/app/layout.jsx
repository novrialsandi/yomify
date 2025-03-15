import "./globals.css";
import "driver.js/dist/driver.css";
import { Single_Day } from "next/font/google";

const singleDay = Single_Day({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({ children }) {
	return (
		<html lang="en" translate="no">
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1"
				/>
			</head>
			<body
				className={`${singleDay.className} min-h-svh flex items-center justify-center`}
			>
				{children}
			</body>
		</html>
	);
}
