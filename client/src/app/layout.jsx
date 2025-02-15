import "./globals.css";

export const metadata = {
	title: "Yomi in Action",
	description:
		"Build Interactive wedding invitations, company profiles, and life documentation with ease.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`min-h-screen`}>{children}</body>
		</html>
	);
}
