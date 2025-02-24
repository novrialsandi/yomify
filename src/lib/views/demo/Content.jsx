"use client";

import Modal from "@/lib/components/Modal";
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";
import { contents } from "@/lib/content-data/demo";

const Content = () => {
	const audioRef = useRef(null); // Reference to background music
	const clickSoundRef = useRef(null); // Reference to click sound
	const [musicActive, setMusicActive] = useState(false);
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

	const playClickSound = () => {
		if (clickSoundRef.current) {
			// Create a new Audio instance for each click
			const sound = new Audio("/audio/demo/menu-select.wav");
			sound.volume = 0.5;
			sound.play().catch((error) => {
				console.log("Error playing sound:", error);
				// Fallback to the ref-based audio if the new instance fails
				if (clickSoundRef.current) {
					clickSoundRef.current.currentTime = 0;
					clickSoundRef.current.play();
				}
			});
		}
	};

	const handleClick = (name) => {
		// playClickSound(); // Play click sound for all content interactions

		if (name === "music") {
			toggleMusic();
		} else {
			toggleModal(name);
		}
	};

	const toggleModal = (name) => {
		setModalContent((prev) => ({ ...prev, [name]: !prev[name] }));
		setOpenedContent((prev) => ({ ...prev, [name]: true }));
	};

	const toggleMusic = () => {
		if (audioRef.current) {
			if (audioRef.current.paused) {
				setMusicActive(true);
				audioRef.current.play();
			} else {
				setMusicActive(false);
				audioRef.current.pause();
			}
		}
		setOpenedContent((prev) => ({ ...prev, music: true }));
		setModalContent((prev) => ({ ...prev, music: !prev.music }));
	};

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = 0.3;
		}
	}, []);

	return (
		<>
			{/* Audio Elements */}
			<audio
				ref={audioRef}
				src="/audio/demo/bg-music.mp3"
				loop
				preload="auto"
			/>
			<audio ref={clickSoundRef} preload="auto" />

			{/* Modal List */}
			<Modal visible={modalList} preventClose position="center">
				<div className="flex flex-col items-center justify-center text-white text-center py-4 px-6">
					<h2 className="text-xl font-semibold mb-4">Content Details</h2>
					<table className="w-full border-collapse">
						<thead>
							<tr className="border-b border-gray-300">
								<th className="px-4 py-2 text-center">Object</th>
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
										{openedContent[item.name] ? (
											item.name === "globe" ? (
												<a
													href="https://www.google.com/maps/place/Ndalem+Hanoman/@-7.7935397,110.3693196,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a59f1b125f11b:0xc4edf781ca003a86!8m2!3d-7.7935397!4d110.3718945!16s%2Fg%2F11vjpvrj_9?entry=ttu&g_ep=EgoyMDI1MDIxOC4wIKXMDSoASAFQAw%3D%3D"
													target="_blank"
													rel="noreferrer"
												>
													{item.detail}
												</a>
											) : (
												item.detail
											)
										) : (
											"????"
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Modal>

			{/* Individual Content Modals (excluding music) */}
			{contents
				.filter((item) => item.name !== "music")
				.map((item) => (
					<Modal
						key={item.name}
						visible={modalContent[item.name]}
						position="center"
						onClose={() => toggleModal(item.name)} // This will now work correctly
					>
						<div className="text-white text-center flex flex-col justify-center items-center p-6">
							<div className="text-xl font-semibold mb-4">
								<img src={item.img} alt="" className="h-32 w-auto" />
							</div>
							{item.name === "globe" ? (
								<a
									href="https://www.google.com/maps/place/Ndalem+Hanoman/@-7.7935397,110.3693196,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a59f1b125f11b:0xc4edf781ca003a86!8m2!3d-7.7935397!4d110.3718945!16s%2Fg%2F11vjpvrj_9?entry=ttu&g_ep=EgoyMDI1MDIxOC4wIKXMDSoASAFQAw%3D%3D"
									target="_blank"
									rel="noreferrer"
									className="text-lg"
								>
									{item.detail}
								</a>
							) : (
								<p className="text-lg">{item.detail}</p>
							)}
						</div>
					</Modal>
				))}
			{/* Image Container */}
			<div className="relative w-full">
				<img
					src="/demo/cleanBG.png"
					alt=""
					className="w-full h-auto max-h-svh"
				/>

				{/* Icons */}
				<div className="absolute top-6 left-6 flex gap-2 z-10">
					<Icon
						icon="hugeicons:note-03"
						className="text-white text-5xl hover:drop-shadow-[0_0_6px_rgba(255,255,0,0.7)]"
						onClick={() => {
							playClickSound();
							setModalList((prev) => !prev);
						}}
					/>
				</div>

				{/* Content Items */}
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
						onPointerUp={() => {
							playClickSound();
						}}
					>
						<img
							src={item.img}
							alt={item.detail}
							className="transition-all duration-200 hover:drop-shadow-[0px_0px_12px_rgba(255,255,0,1)] hover:cursor-pointer"
						/>

						{musicActive && item.name === "music" && (
							<div className="absolute w-full h-full">
								<img
									src="/demo/active/speaker.gif"
									alt=""
									className="absolute"
									style={{
										top: `${item.y - 220}%`,
										left: `${item.x + 35}%`,
										width: `${item.w}%`,
									}}
								/>
								<img
									src="/demo/active/speaker.gif"
									alt=""
									className="absolute"
									style={{
										top: `${item.y - 240}%`,
										left: `${item.x - 45}%`,
										width: `${item.w}%`,
									}}
								/>
							</div>
						)}
					</div>
				))}
			</div>
		</>
	);
};

export default Content;
