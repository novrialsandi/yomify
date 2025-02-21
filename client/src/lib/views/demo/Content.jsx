import { Icon } from "@iconify/react";
import Modal from "@/lib/components/Modal";

const Content = () => {
	const content = [
		{
			w: 32.5,
			x: 37.5,
			y: 47.36,
			content: "/contents/base/speaker.png",
			detail: "Music",
		},
		{
			w: 30,
			x: 33.1,
			y: 43.7,
			content: "/contents/base/laptop.png",
			detail: "Wish",
		},
		{
			w: 36,
			x: 58.8,
			y: 72.3,
			content: "/contents/base/camera.png",
			detail: "Wedding Photo",
		},
		{
			w: 45,
			x: 26.8,
			y: 67.2,
			content: "/contents/base/amplop.png",
			detail: "Who & Who",
		},
		{
			w: 8,
			x: 65.7,
			y: 38.2,
			content: "/contents/base/date.png",
			detail: "31 Februari 2025",
		},
		{
			w: 21.5,
			x: 78.5,
			y: 45.8,
			content: "/contents/base/globe.png",
			detail: "Tipsy",
		},
		{
			w: 33.4,
			x: 65.5,
			y: 64.2,
			content: "/contents/base/botol.png",
			detail: "Tipsy",
		},
	];
	return (
		<>
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
		</>
	);
};

export default Content;
