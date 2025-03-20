import LandingPage from "@/lib/views/LandingPage";
import { GoogleAnalytics } from "@next/third-parties/google";

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
				url: "/meta.webp",
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
		images: ["/meta.webp"],
	},
};

const MainPage = () => {
	return (
		<div className="relative flex flex-col items-center w-full">
			<LandingPage />
			<GoogleAnalytics gaId="G-NW36Y5FXGB" />
		</div>
	);
};

export default MainPage;
