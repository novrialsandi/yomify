import "./globals.css";

export const metadata = {
	title: "Yomi's Project",
	description:
		"Build Interactive wedding invitations, company profiles, and life documentation with ease.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`min-h-svh flex items-center justify-center`}>
				{children}
			</body>
		</html>
	);
}
