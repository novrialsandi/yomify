"use client";

import { useState, useRef, useEffect } from "react";
import { getCookie, setCookie } from "@/lib/helpers/cookie";
import { contents } from "@/lib/content-data/demo";
import ModalContent from "./ModalContent";
import DisableRightClick from "@/lib/components/DisableRightClick";
import { driver } from "driver.js";
import { motion, AnimatePresence } from "framer-motion";

const Content = () => {
	// Audio context ref to persist across renders
	const audioContextRef = useRef(null);
	// Buffer cache to store loaded audio files
	const audioBufferCacheRef = useRef({});
	// Track if sounds are currently playing
	const playingSourcesRef = useRef({});

	const [assetsLoaded, setAssetsLoaded] = useState(false);
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

	// Initialize audio context on component mount
	useEffect(() => {
		// Create audio context only once when component mounts
		audioContextRef.current = new (window.AudioContext ||
			window.webkitAudioContext)();

		// Clean up function
		return () => {
			if (
				audioContextRef.current &&
				audioContextRef.current.state !== "closed"
			) {
				audioContextRef.current.close();
			}
		};
	}, []);

	// Function to load audio buffer
	const loadAudioBuffer = async (soundKey) => {
		try {
			const response = await fetch(`/audio/demo/${soundKey}`);
			const arrayBuffer = await response.arrayBuffer();
			const audioBuffer = await audioContextRef.current.decodeAudioData(
				arrayBuffer
			);
			audioBufferCacheRef.current[soundKey] = audioBuffer;
			return audioBuffer;
		} catch (error) {
			console.error("Error loading audio:", error);
			return null;
		}
	};

	const playClickSound = async (item) => {
		// Resume audio context if it's suspended (needed for some browsers)
		if (audioContextRef.current.state === "suspended") {
			await audioContextRef.current.resume();
		}

		// Use default sound if no item specified
		const soundKey = item || "menu-select.wav";

		// Check if this sound is already playing
		if (playingSourcesRef.current[soundKey]) {
			// Don't play again if already playing
			return;
		}

		// Get or load the audio buffer
		let buffer = audioBufferCacheRef.current[soundKey];
		if (!buffer) {
			buffer = await loadAudioBuffer(soundKey);
			if (!buffer) return; // Exit if buffer couldn't be loaded
		}

		// Create source node
		const source = audioContextRef.current.createBufferSource();
		source.buffer = buffer;

		// Create gain node for volume control
		const gainNode = audioContextRef.current.createGain();
		gainNode.gain.value = 0.7; // Set volume to 0.7

		// Connect nodes: source -> gain -> destination
		source.connect(gainNode);
		gainNode.connect(audioContextRef.current.destination);

		// Mark this sound as playing
		playingSourcesRef.current[soundKey] = source;

		// When sound ends, remove from playing sources
		source.onended = () => {
			delete playingSourcesRef.current[soundKey];
		};

		// Start playback
		source.start(0);
	};

	const toggleMusic = () => {
		if (!audioRef.current) {
			audioRef.current = new Audio("/audio/demo/bg-music.mp3");
			audioRef.current.volume = 0.15;
			audioRef.current.loop = true;
		}

		if (musicActive) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}

		setMusicActive(!musicActive);
		// updateOpenedContent("music");
		setModalContent((prev) => ({ ...prev, music: !prev.music }));
	};

	const runDriverTour = () => {
		const driverObj = driver({
			disableActiveInteraction: true,
			allowClose: !getCookie("session") ? false : true,
			popoverClass: "driverjs-theme",
			showProgress: true,
			stagePadding: 0,
			steps: [
				{
					popover: {
						title: "Hey Yomies! 👋",
						description:
							"This is an interactive experience where you can explore different objects on the page—each one revealing unique wedding details and fun trivia! ✨",
					},
				},
				{
					element: `[data-item="list"]`,
					popover: {
						title: "All the Wedding Details 💍",
						description:
							"Tap here to see everything you've discovered about the big day—meet the lovely couple, check the schedule, and more!",
						side: "bottom",
						align: "center",
					},
				},
				{
					element: `[data-item="map"]`,
					popover: {
						title: "Spoiler 🎈",
						description:
							"Click here to find the venue and get directions so you won't miss a moment of the celebration!",
						side: "top",
						align: "center",
					},
				},
				{
					popover: {
						title: "See You There! 🥂",
						description:
							"Hope you have fun exploring! We can't wait to celebrate with you! 🎊<br><br>With love,<br>Yomify🐾",
					},
				},
			],
		});
		driverObj.drive();
	};

	const handleClick = (name) => {
		if (name === "music") {
			toggleMusic();
		} else if (name === "hint") {
			runDriverTour();
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
		const preloadImages = () => {
			const imagePromises = contents.map((item) => {
				return new Promise((resolve) => {
					const img = new Image();
					img.src = item.img;
					img.onload = () => resolve();
					img.onerror = () => resolve();
				});
			});

			Promise.all(imagePromises).then(() => setAssetsLoaded(true));
		};

		preloadImages();
	}, []);

	return (
		<DisableRightClick>
			<ModalContent
				contents={contents}
				modalContent={modalContent}
				toggleModal={toggleModal}
				openedContent={getOpenedContent()}
			/>
			<AnimatePresence>
				{intro && (
					<div key="intro" className="absolute z-10 w-full">
						<motion.img
							src="/demo/intro.webp"
							alt=""
							className="w-full h-auto max-h-svh"
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 1.2 }}
							transition={{ duration: 0.6, ease: "easeOut" }}
						/>
						<button
							className="absolute left-1/2 top-[75%]"
							style={{
								top: `81%`,
								left: `50%`,
								width: `38%`,
								height: "12%",
								transform: "translate(-50%, -50%)",
							}}
							onClick={() => {
								setIntro(false);
								toggleMusic();
								if (!getCookie("session")) {
									runDriverTour();
									updateOpenedContent("bottle");
								}
							}}
						/>
					</div>
				)}

				<div className="relative w-full">
					<img
						src="/demo/cleanBG.webp"
						alt=""
						className="w-screen h-auto max-h-svh"
					/>

					{/* Content Items */}
					{contents.map((item, index) => (
						<div
							key={index}
							className="absolute "
							style={{
								top: `${item.y}%`,
								left: `${item.x}%`,
								width: `${item.w}%`,
								transform: "translate(-50%, -50%)",
							}}
							onClick={() => handleClick(item.name)}
							onPointerUp={() => {
								playClickSound(item.audio);
							}}
							data-item={item.name}
						>
							<img
								src={item.img}
								alt={item.detail}
								className="transition-all h-full w-96 duration-200 hover:drop-shadow-[0px_0px_4px_rgba(250,249,219,1)] hover:cursor-pointer"
							/>

							{musicActive && item.name === "music" && (
								<>
									<img
										src="/demo/active/speaker.gif"
										alt=""
										className="absolute"
										style={{
											top: `${item.y - 100}%`,
											left: `${item.x + 35}%`,
											width: `${item.w}%`,
											transform: "translate(-50%, -50%)",
										}}
									/>
									<img
										src="/demo/active/speaker.gif"
										alt=""
										className="absolute"
										style={{
											top: `${item.y - 160}%`,
											left: `${item.x - 60}%`,
											width: `${item.w}%`,
										}}
									/>
								</>
							)}
						</div>
					))}
				</div>
			</AnimatePresence>
		</DisableRightClick>
	);
};

export default Content;
