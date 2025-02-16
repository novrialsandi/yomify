"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import Modal from "@/lib/components/Modal";

const MainPage = () => {
	const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
	const imageRef = useRef(null);
	const audioRef = useRef(null);
	const selectSoundRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [modalList, setModalList] = useState(false);
	const [openedContent, setOpenedContent] = useState({});
	const [modalContent, setModalContent] = useState({
		red: false,
		green: false,
		blue: false,
		yellow: false,
		orange: false,
	});

	const content = [
		{ x: 50, y: 50, content: "red", detail: "Wish" },
		{ x: 50, y: 70, content: "green", detail: "Who & Who" },
		{ x: 83, y: 78, content: "blue", detail: "Wedding Photo" },
		{ x: 70, y: 40, content: "yellow", detail: "31 Februari 2025" },
		{ x: 90, y: 53, content: "orange", detail: "Tipsy" },
		{ x: 65, y: 52, content: "purple", detail: "Music" },
	];

	const updateImageSize = () => {
		if (imageRef.current) {
			setImageSize({
				width: imageRef.current.clientWidth,
				height: imageRef.current.clientHeight,
			});
		}
	};

	const playSelectSound = () => {
		if (selectSoundRef.current) {
			selectSoundRef.current.currentTime = 0; // Reset the audio to start
			selectSoundRef.current.play();
		}
	};

	const handleClick = (color) => {
		playSelectSound(); // Play select sound for all content clicks

		if (color === "purple") {
			handleMusicToggle();
			// Mark as opened in the list without showing modal
			setOpenedContent((prev) => ({
				...prev,
				[color]: true,
			}));
		} else {
			toggleModal(color);
		}
	};

	const toggleModal = (color) => {
		setModalContent((prev) => ({
			...prev,
			[color]: !prev[color],
		}));
		setOpenedContent((prev) => ({
			...prev,
			[color]: true,
		}));
	};

	const handleMusicToggle = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	useEffect(() => {
		updateImageSize();
		window.addEventListener("resize", updateImageSize);
		if (audioRef.current) {
			audioRef.current.volume = 0.3; // 30% volume
		}
		if (selectSoundRef.current) {
			selectSoundRef.current.volume = 0.5; // 50% volume for select sound
		}
		return () => window.removeEventListener("resize", updateImageSize);
	}, []);

	return (
		<div className="relative flex items-center w-full">
			<audio ref={audioRef} src="/audio/bg-music.mp3" loop />
			<audio ref={selectSoundRef} src="/audio/menu-select.mp3" />

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
							{content.map((item, i) => (
								<tr key={i} className="border-b border-gray-300">
									<td className="px-4 py-2">
										{openedContent[item.content] ? item.content : "????"}
									</td>
									<td className="px-4 py-2">
										{openedContent[item.content] ? item.detail : "????"}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Modal>

			{/* Individual Content Modals (excluding purple) */}
			{content
				.filter((item) => item.content !== "purple")
				.map((item) => (
					<Modal
						key={item.content}
						visible={modalContent[item.content]}
						position="center"
					>
						<div className="text-white text-center p-6">
							<h2 className="text-xl font-semibold mb-4">
								{item.content.toUpperCase()} Detail
							</h2>
							<p className="text-lg">{item.detail}</p>
							<button
								className="mt-4 px-4 py-2 bg-gray-700 rounded-md"
								onClick={() => toggleModal(item.content)}
							>
								Close
							</button>
						</div>
					</Modal>
				))}

			{/* Image Container */}
			<div className="relative w-full">
				<img
					ref={imageRef}
					src="/bg.jpeg"
					alt=""
					className="w-full h-auto max-h-svh"
					onLoad={updateImageSize}
				/>

				{/* Icons */}
				<div className="absolute top-6 left-6 flex gap-2 z-10">
					<Icon
						icon="hugeicons:note-03"
						className="text-white text-5xl hover:drop-shadow-[0_0_6px_rgba(255,255,0,0.7)]"
						onClick={() => {
							playSelectSound();
							setModalList((prev) => !prev);
						}}
					/>
				</div>

				{/* Dynamically positioned content */}
				{imageSize.width > 0 &&
					imageSize.height > 0 &&
					content.map((item, index) => (
						<div
							key={index}
							className="absolute rounded-full flex items-center justify-center text-white font-bold text-4xl transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
							style={{
								left: `${(item.x / 100) * imageSize.width}px`,
								top: `${(item.y / 100) * imageSize.height}px`,
								width: `${imageSize.width * 0.08}px`,
								height: `${imageSize.width * 0.08}px`,
								backgroundColor: item.content,
							}}
							onClick={() => handleClick(item.content)}
						>
							{item.content === "purple" && (
								<Icon
									icon={isPlaying ? "mdi:music-note" : "mdi:music-note-off"}
									className="text-white text-2xl"
								/>
							)}
						</div>
					))}
			</div>
		</div>
	);
};

export default MainPage;
