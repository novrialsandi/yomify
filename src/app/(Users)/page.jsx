import LandingPage from "@/lib/views/LandingPage";

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

const MainPage = () => {
	return (
		<div className="relative flex flex-col items-center w-full">
			<LandingPage />
		</div>
	);
};

export default MainPage;
