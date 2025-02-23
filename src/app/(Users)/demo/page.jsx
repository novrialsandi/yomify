import Content from "@/lib/views/demo/Content";

export const metadata = {
	title: "Yomify - Demo",
	description:
		"Build Interactive wedding invitations, company profiles, and life documentation with ease.",
	metadataBase: new URL("https://www.yomify.com/demo"),
	openGraph: {
		type: "website",
		url: "https://www.yomify.com/demo",
		title: "Yomify - Demo",
		description: "Interactive wedding invitations demo",
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
		description: "Interactive wedding invitations demo",
		images: ["/demo/bg.png"],
	},
};

const MainPage = () => {
	return (
		<div className="relative flex items-center w-full">
			<Content />
		</div>
	);
};

export default MainPage;
