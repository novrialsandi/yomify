import Content from "@/lib/views/demo/Index";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
	title: "Yomify - Demo",
	description:
		"Interactive wedding invitations, company profiles, and life documentation with ease.",
	metadataBase: new URL("https://www.yomify.com/demo"),
	openGraph: {
		type: "website",
		url: "https://www.yomify.com/demo/",
		title: "Yomify - Demo",
		description:
			"Interactive wedding invitations, company profiles, and life documentation with ease.",
		images: [
			{
				url: "/demo/bg.png",
				width: 1200,
				height: 630,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Yomify - Demo",
		description:
			"Interactive wedding invitations, company profiles, and life documentation with ease.",
		images: ["/demo/bg.png"],
	},
};

const MainPage = () => {
	return (
		<div className="relative flex items-center w-full">
			<Content />
			<GoogleAnalytics gaId="G-NW36Y5FXGB" />
		</div>
	);
};

export default MainPage;
