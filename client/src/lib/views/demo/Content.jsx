"use client";

import { Icon } from "@iconify/react";
import Modal from "@/lib/components/Modal";
import { useState } from "react";

const Content = () => {
	const [modalList, setModalList] = useState(false);
	const [openedContent, setOpenedContent] = useState({});
	const [modalContent, setModalContent] = useState({
		music: false,
		laptop: false,
		camera: false,
		amplop: false,
		date: false,
		globe: false,
		botol: false,
	});

	const contents = [
		{
			name: "music",
			w: 32.5,
			x: 37.5,
			y: 47.36,
			img: "/contents/base/speaker.png",
			detail: "Novo Amor - Anchor",
		},
		{
			name: "laptop",
			w: 30,
			x: 33.1,
			y: 43.7,
			img: "/contents/base/laptop.png",
			detail: "Wish",
		},
		{
			name: "camera",
			w: 36,
			x: 58.8,
			y: 72.3,
			img: "/contents/base/camera.png",
			detail: "Wedding Photo",
		},
		{
			name: "amplop",
			w: 45,
			x: 26.8,
			y: 67.2,
			img: "/contents/base/amplop.png",
			detail: "Yo & Mi",
		},
		{
			name: "date",
			w: 8,
			x: 65.7,
			y: 38.2,
			img: "/contents/base/date.png",
			detail: "31 Februari 2025",
		},
		{
			name: "globe",
			w: 21.5,
			x: 78.5,
			y: 45.8,
			img: "/contents/base/globe.png",
			detail: "Ndalem Hanoman",
		},
		{
			name: "botol",
			w: 33.4,
			x: 65.5,
			y: 64.2,
			img: "/contents/base/botol.png",
			detail: "Wedding Invitation",
		},
	];

	const handleClick = (name) => {
		// playSelectSound();

		// if (name === "music") {
		// 	handleMusicToggle();
		// 	setOpenedContent((prev) => ({
		// 		...prev,
		// 		[name]: true,
		// 	}));
		// } else {
		toggleModal(name);
		// }
	};

	const toggleModal = (name) => {
		setModalContent((prev) => ({
			...prev,
			[name]: !prev[name],
		}));
		setOpenedContent((prev) => ({
			...prev,
			[name]: true,
		}));
	};
	return (
		<>
			{/* <audio src="/audio/bg-music.mp3" loop preload="auto" />
			<audio src="/audio/menu-select.mp3" preload="auto" /> */}

			{/* Modal List */}
			<Modal visible={modalList} preventClose position="center">
				<div className="flex flex-col items-center justify-center text-white text-center py-4 px-6">
					<h2 className="text-xl font-semibold mb-4">Content Details</h2>
					<table className="w-full border-collapse">
						<thead>
							<tr className="border-b border-gray-300">
								<th className="px-4 py-2 text-center">Color</th>
								<th className="px-4 py-2 text-center">Description</th>
							</tr>
						</thead>
						<tbody>
							{contents.map((item, i) => (
								<tr key={i} className="border-b border-gray-300">
									<td className="px-4 h-10 py-1.5 flex items-center justify-center">
										{openedContent[item.name] ? (
											<img src={item.img} alt="" className="h-full w-auto" />
										) : (
											"????"
										)}
									</td>
									<td className="px-4 h-10">
										{openedContent[item.name] ? item.detail : "????"}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Modal>

			{/* Individual Content Modals (excluding purple) */}
			{contents
				.filter((item) => item.name !== "music")
				.map((item) => (
					<Modal
						key={item.name}
						visible={modalContent[item.name]}
						position="center"
					>
						<div className="text-white text-center flex flex-col justify-center items-center p-6">
							<div className="text-xl font-semibold mb-4">
								<img src={item.img} alt="" className="w-20 h-auto" />
							</div>
							<p className="text-lg">{item.detail}</p>
							<button
								className="mt-4 px-4 py-2 bg-gray-700 rounded-md"
								onClick={() => toggleModal(item.name)}
							>
								Close
							</button>
						</div>
					</Modal>
				))}

			{/* Image Container */}
			<div className="relative w-full">
				{/* <img src="/bg.png" alt="" className="w-full h-auto max-h-svh" /> */}
				<img src="/cleanBG.png" alt="" className="w-full h-auto max-h-svh" />

				{/* Icons */}
				<div className="absolute top-6 left-6 flex gap-2 z-10">
					<Icon
						icon="hugeicons:note-03"
						className="text-white text-5xl hover:drop-shadow-[0_0_6px_rgba(255,255,0,0.7)]"
						onClick={() => {
							setModalList((prev) => !prev);
						}}
					/>
				</div>

				{contents.map((item, index) => (
					<div
						key={index}
						className="absolute h-auto"
						style={{
							top: `${item.y}%`,
							left: `${item.x}%`,
							width: `${item.w}%`,
						}}
						onClick={() => handleClick(item.name)}
					>
						<img
							src={item.img}
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
