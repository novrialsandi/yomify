import "./globals.css";
import { Single_Day } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

const singleDay = Single_Day({
	weight: "400", // Single Day is only available in 400 weight
	subsets: ["latin"], // Specify the subset you need
	display: "swap",
});

export const metadata = {
	title: "Yomify",
	description:
		"Build Interactive wedding invitations, company profiles, and life documentation with ease.",
	metadataBase: new URL("https://www.yomify.com"),
	openGraph: {
		type: "website",
		url: "https://www.yomify.com/",
		title: "Yomify",
		description:
			"Build Interactive wedding invitations, company profiles, and life documentation with ease.",
		images: [
			{
				url: "/meta.png",
				width: 1200,
				height: 630,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Yomify",
		description:
			"Build Interactive wedding invitations, company profiles, and life documentation with ease.",
		images: ["/meta.png"],
	},
};

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
