import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Yomi in Action",
	description:
		"Build Interactive wedding invitations, company profiles, and life documentation with ease.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} min-h-screen  flex justify-center items-center overflow-x-hidden`}
			>
				<div className="max-w-[544px] w-full overflow-x-hidden">{children}</div>
			</body>
		</html>
	);
}
