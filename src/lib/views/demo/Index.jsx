"use client";

import { useState, useRef, useEffect } from "react";
import { getCookie, setCookie } from "@/lib/helpers/cookie";
import { contents } from "@/lib/content-data/demo";
import ModalContent from "./ModalContent";

const Content = () => {
	const [intro, setIntro] = useState(true);
	const audioRef = useRef(null);
	const [musicActive, setMusicActive] = useState(false);
	const [modalContent, setModalContent] = useState({
		music: false,
		laptop: false,
		camera: false,
		amplop: false,
		date: false,
		map: false,
		bottle: false,
	});

	// Function to get openedContent from cookies
	const getOpenedContent = () => {
		const openedContentCookie = getCookie("openedContent");
		return openedContentCookie ? openedContentCookie : {};
	};

	// Function to update openedContent in cookies
	const updateOpenedContent = (name) => {
		const currentOpenedContent = getOpenedContent();
		const updatedOpenedContent = { ...currentOpenedContent, [name]: true };
		setCookie("openedContent", updatedOpenedContent);
	};

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
		updateOpenedContent("music");
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
		updateOpenedContent(name);
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
		const openedContent = getOpenedContent();

		if (!openedContent.bottle && !intro) {
			setModalContent((prev) => ({ ...prev, bottle: true }));
		}
	}, [intro]);

	if (intro) {
		return (
			<div className="relative w-full">
				<img
					src="/demo/intro.jpeg"
					alt=""
					className="w-full h-auto max-h-svh"
				/>
				<button
					className="absolute left-1/2 top-[75%] -translate-x-1/2 w-32 h-20"
					onClick={() => {
						setIntro(false);
						toggleMusic();
					}}
				/>
			</div>
		);
	}

	return (
		<>
			{/* Individual Content Modals (excluding music) */}
			<ModalContent
				contents={contents}
				modalContent={modalContent}
				toggleModal={toggleModal}
				openedContent={getOpenedContent()}
			/>

			{/* Image Container */}
			<div className="relative w-full">
				<img
					src="/demo/cleanBG.png"
					alt=""
					className="w-full h-auto max-h-svh"
				/>

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
