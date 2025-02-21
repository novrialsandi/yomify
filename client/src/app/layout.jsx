import "./globals.css";
import { Single_Day } from "next/font/google";

const singleDay = Single_Day({
	weight: "400", // Single Day is only available in 400 weight
	subsets: ["latin"], // Specify the subset you need
	display: "swap",
});

export const metadata = {
	title: "Yomi's Project",
	description:
		"Build Interactive wedding invitations, company profiles, and life documentation with ease.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${singleDay.className} min-h-svh flex items-center justify-center`}
			>
				{children}
			</body>
		</html>
	);
}
