"use client";

import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";
import { getCookie } from "@/lib/helpers/cookie";
import { contents } from "@/lib/content-data/demo";
import ModalList from "./ModalList";
import ModalContent from "./ModalContent";

const Content = () => {
	const audioRef = useRef(null);
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
		bottle: false,
	});

	const playClickSound = () => {
		const sound = new Audio("/audio/demo/menu-select.wav");
		sound.volume = 0.5;
		sound.play().catch((error) => {
			console.log("Error playing sound:", error);
		});
	};

	const toggleMusic = () => {
		if (!audioRef.current) {
			audioRef.current = new Audio("/audio/demo/bg-music.mp3");
			audioRef.current.volume = 0.3;
			audioRef.current.loop = true;
		}

		if (musicActive) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}

		setMusicActive(!musicActive);
		setOpenedContent((prev) => ({ ...prev, music: true }));
		setModalContent((prev) => ({ ...prev, music: !prev.music }));
	};

	const handleClick = (name) => {
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

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.hidden && musicActive && audioRef.current) {
				audioRef.current.pause();
				setMusicActive(false);
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [musicActive]);

	useEffect(() => {
		const boarding = getCookie("boarding");
		setModalContent((prev) => ({
			...prev,
			bottle: boarding ? false : true,
		}));
	}, []);

	return (
		<>
			{/* Modal List */}
			<ModalList
				isVisible={modalList}
				contents={contents}
				openedContent={openedContent}
			/>

			{/* Individual Content Modals (excluding music) */}
			<ModalContent
				contents={contents}
				modalContent={modalContent}
				toggleModal={toggleModal}
				toggleMusic={toggleMusic}
			/>

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
							setModalList((prev) => !prev);
						}}
						onPointerUp={() => {
							playClickSound();
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
