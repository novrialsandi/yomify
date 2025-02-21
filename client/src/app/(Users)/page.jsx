import { Icon } from "@iconify/react";
import Modal from "@/lib/components/Modal";

const MainPage = () => {
	const content = [
		{
			w: 32.5,
			x: 37.5,
			y: 47.36,
			content: "/contents/base/speaker.png",
			detail: "Music",
		},
		{
			w: 0,
			x: 50,
			y: 50,
			content: "/contents/base/laptop.png",
			detail: "Wish",
		},
		{
			w: 0,
			x: 50,
			y: 70,
			content: "/contents/base/amplop.png",
			detail: "Who & Who",
		},
		{
			w: 0,
			x: 83,
			y: 78,
			content: "/contents/base/camera.png",
			detail: "Wedding Photo",
		},
		{
			w: 0,
			x: 70,
			y: 40,
			content: "/contents/base/date.png",
			detail: "31 Februari 2025",
		},
		{
			w: 0,
			x: 90,
			y: 53,
			content: "/contents/base/globe.png",
			detail: "Tipsy",
		},
	];

	return (
		<div className="relative flex items-center w-full">
			{/* <audio src="/audio/bg-music.mp3" loop preload="auto" />
			<audio src="/audio/menu-select.mp3" preload="auto" /> */}

			{/* Image Container */}
			<div className="relative w-full">
				{/* <img src="/bg.png" alt="" className="w-full h-auto max-h-svh" /> */}
				<img src="/cleanBG.png" alt="" className="w-full h-auto max-h-svh" />

				{content.map((item, index) => (
					<div
						key={index}
						className="absolute h-auto"
						style={{
							top: `${item.y}%`,
							left: `${item.x}%`,
							width: `${item.w}%`,
						}}
					>
						<img
							src={item.content}
							alt={item.detail}
							className="transition-all duration-200 hover:drop-shadow-[0_4px_4px_rgba(255,255,0,0.9)] hover:cursor-pointer"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default MainPage;
