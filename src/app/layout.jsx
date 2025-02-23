import "./globals.css";
import { Single_Day } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

const singleDay = Single_Day({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${singleDay.className} min-h-svh flex items-center justify-center`}
			>
				<GoogleAnalytics gaId="G-NW36Y5FXGB" />
				{children}
			</body>
		</html>
	);
}
