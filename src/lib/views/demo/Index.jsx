"use client";

import { useState, useRef, useEffect } from "react";
import { getCookie, setCookie } from "@/lib/helpers/cookie";
import { contents, stepsDemo } from "@/lib/content-data/demo";
import ModalContent from "./ModalContent";
import DisableRightClick from "@/lib/components/DisableRightClick";
import { motion, AnimatePresence } from "framer-motion";
import runDriverTour from "@/lib/helpers/driverjs";

const Content = () => {
	// Audio context ref to persist across renders
	const audioContextRef = useRef(null);
	// Buffer cache to store loaded audio files
	const audioBufferCacheRef = useRef({});
	// Track if sounds are currently playing
	const playingSourcesRef = useRef({});
	// Reference to store image maps
	const imageMapRefs = useRef({});

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

	const handleClick = (name) => {
		if (name === "music") {
			toggleMusic();
		} else if (name === "hint") {
			runDriverTour(stepsDemo);
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

	// Preload images and create hitboxes
	useEffect(() => {
		const preloadImages = async () => {
			// Create a promise for each image to load
			const imagePromises = contents.map((item) => {
				return new Promise((resolve) => {
					const img = new Image();
					img.src = item.img;
					img.onload = () => {
						// Create canvas for image analysis
						const canvas = document.createElement("canvas");
						const ctx = canvas.getContext("2d", { willReadFrequently: true });
						canvas.width = img.width;
						canvas.height = img.height;
						ctx.drawImage(img, 0, 0);

						// Store the pixel data for hit testing
						try {
							const imageData = ctx.getImageData(
								0,
								0,
								canvas.width,
								canvas.height
							);
							imageMapRefs.current[item.name] = {
								data: imageData.data,
								width: canvas.width,
								height: canvas.height,
							};
						} catch (e) {
							console.error("Error creating hitmap for", item.name, e);
						}
						resolve();
					};
					img.onerror = () => resolve(); // Continue even if image fails to load
				});
			});

			// Wait for all images to load
			await Promise.all(imagePromises);
		};

		preloadImages();
	}, []);

	// Function to check if a point is within the non-transparent part of an image
	const isPointInImage = (itemName, x, y, element) => {
		const mapData = imageMapRefs.current[itemName];
		if (!mapData) return true; // Fallback to normal clicking if no hit map

		// Get element position
		const rect = element.getBoundingClientRect();

		// Convert page coordinates to image coordinates
		const imageX = Math.floor(((x - rect.left) / rect.width) * mapData.width);
		const imageY = Math.floor(((y - rect.top) / rect.height) * mapData.height);

		// Check if within bounds
		if (
			imageX < 0 ||
			imageX >= mapData.width ||
			imageY < 0 ||
			imageY >= mapData.height
		) {
			return false;
		}

		// Check alpha channel (4th value in RGBA)
		const pixelIndex = (imageY * mapData.width + imageX) * 4 + 3;
		return mapData.data[pixelIndex] > 30; // Alpha threshold
	};

	// Handle clicks with precise hit detection
	const handleItemClick = (e, item) => {
		const element = e.currentTarget;

		// Only process click if it hits a non-transparent pixel
		if (isPointInImage(item.name, e.clientX, e.clientY, element)) {
			playClickSound(item.audio);
			handleClick(item.name);
		}
	};

	// Handle hover effects with precise hit detection
	const handleHover = (e, entering) => {
		const element = e.currentTarget;
		const itemName = element.getAttribute("data-item");

		if (entering) {
			// Check if hover is on a non-transparent pixel
			if (isPointInImage(itemName, e.clientX, e.clientY, element)) {
				const img = element.querySelector("img");
				if (img) {
					img.style.filter = "drop-shadow(0px 0px 4px rgba(250,249,219,1))";
				}
			}
		} else {
			// Remove hover effect
			const img = element.querySelector("img");
			if (img) {
				img.style.filter = "drop-shadow(0px 0px 0px transparent)";
			}
		}
	};

	// Handle pointer movement for dynamic hover effects
	const handlePointerMove = (e) => {
		const element = e.currentTarget;
		const itemName = element.getAttribute("data-item");
		const img = element.querySelector("img");

		if (isPointInImage(itemName, e.clientX, e.clientY, element)) {
			if (img) {
				img.style.filter = "drop-shadow(0px 0px 4px rgba(250,249,219,1))";
				element.style.cursor = "pointer";
			}
		} else {
			if (img) {
				img.style.filter = "drop-shadow(0px 0px 0px transparent)";
			}
			element.style.cursor = "default";
		}
	};

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
					<div key="intro" className="absolute z-10 h-full w-full">
						<motion.img
							src="/demo/intro.webp"
							alt=""
							className="h-auto"
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 1.2 }}
							transition={{ duration: 1, ease: "easeOut" }}
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
								if (!getCookie("intro")) {
									runDriverTour(stepsDemo);
									updateOpenedContent("bottle");
									setCookie("intro", true);
								}
							}}
						/>
					</div>
				)}

				<div className="relative w-full">
					<img src="/demo/cleanBG.webp" alt="" className="h-auto" />

					{contents.map((item, index) => (
						<div
							key={index}
							className="absolute transition-all duration-200"
							style={{
								top: `${item.y}%`,
								left: `${item.x}%`,
								width: `${item.w}%`,
								transform: "translate(-50%, -50%)",
							}}
							onClick={(e) => handleItemClick(e, item)}
							onPointerMove={handlePointerMove}
							onPointerLeave={(e) => handleHover(e, false)}
							data-item={item.name}
						>
							<img
								src={item.img}
								alt={item.detail}
								className="h-full w-96"
								style={{
									filter: "drop-shadow(0px 0px 0px transparent)",
									transition: "filter 0.2s ease",
								}}
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
