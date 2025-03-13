"use client";

import { useState, useRef, useEffect } from "react";
import { getCookie, setCookie } from "@/lib/helpers/cookie";
import { contents } from "@/lib/content-data/demo";
import ModalContent from "./ModalContent";
import DisableRightClick from "@/lib/components/DisableRightClick";
import { driver } from "driver.js";

const Content = () => {
	const randomId = Date.now().toString();
	const randomNumber = Math.floor(Math.random() * 90000) + 10000; // Generate 5-digit random number

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

	const runDriverTour = () => {
		const driverObj = driver({
			disableActiveInteraction: true,
			allowClose: false,
			popoverClass: "driverjs-theme",
			showProgress: true,
			stagePadding: 0,
			steps: [
				{
					popover: {
						title: "Hello Yomies! ",
						description:
							"This is a wedding invitation that provides a unique experience for guests. This invitation encourages guests to interact with various image objects scattered throughout the invitation page. <br><br>Each object plays a special role in conveying wedding details and trivia✨",
					},
				},
				{
					element: `[data-item="list"]`,
					popover: {
						title: "Wedding Details",
						description:
							"Check the full wedding details, including the bride and groom's information, schedule, and etc.",
						side: "bottom",
						align: "center",
					},
				},
				{
					element: `[data-item="map"]`,
					popover: {
						title: "Some Spoiler",
						description:
							"Click here to see the venue location and get directions to the wedding ceremony.",
						side: "top",
						align: "center",
					},
				},
				{
					popover: {
						title: "Final Greetings",
						description:
							"Enjoy the experience and see you at the wedding!🎉 <br><br>Best regards,<br>Yomify🐾",
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
						if (!getCookie("session")) {
							setCookie("session", {
								user_id: randomId,
								name: `demo_${randomNumber}`,
							});
							runDriverTour();
							updateOpenedContent("bottle");
						}
					}}
				/>
			</div>
		);
	}

	return (
		<>
			<DisableRightClick>
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
					{/* <img src="/demo/bg.png" alt="" className="w-full h-auto max-h-svh" /> */}

					{/* Content Items */}
					{contents.map((item, index) => (
						<div
							key={index}
							className="absolute h-auto"
							style={{
								top: `${item.y}%`,
								left: `${item.x}%`,
								width: `${item.w}%`,
								transform: "translate(-50%, -50%)",
							}}
							onClick={() => handleClick(item.name)}
							onPointerUp={() => {
								playClickSound();
							}}
							data-item={item.name}
						>
							<img
								src={item.img}
								alt={item.detail}
								className="transition-all duration-200 hover:drop-shadow-[0px_0px_8px_rgba(255,255,0,30)] hover:cursor-pointer"
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
			</DisableRightClick>
		</>
	);
};

export default Content;
