import Content from "@/lib/views/demo/Index";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Averia_Libre } from "next/font/google";

const averiaLibre = Averia_Libre({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

export const metadata = {
	title: "Yomify - Demo",
	description:
		"Interactive wedding invitations, company profiles, and life documentation with ease.",
	metadataBase: new URL("https://www.yomify.com"),
	openGraph: {
		type: "website",
		url: "https://www.yomify.com/",
		title: "Yomify - Demo",
		description:
			"Interactive wedding invitations, company profiles, and life documentation with ease.",
		images: [
			{
				url: "/demo/bg.webp",
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
		images: ["/demo/bg.webp"],
	},
};

const MainPage = () => {
	return (
		<div
			className={`${averiaLibre.className} relative flex items-center  w-full`}
		>
			<Content />
			<GoogleAnalytics gaId="G-NW36Y5FXGB" />
		</div>
	);
};

export default MainPage;
