import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

export default function Carousel({ children: slides, hideArrow }) {
	const [curr, setCurr] = useState(1); // Start from the first real slide (after the cloned last slide)
	const [isTransitioning, setIsTransitioning] = useState(false);
	const trackRef = useRef(null);

	// Clone first and last slides
	const carouselSlides = [
		slides[slides.length - 1], // Clone of the last slide at the start
		...slides,
		slides[0], // Clone of the first slide at the end
	];

	const handleTransitionEnd = () => {
		setIsTransitioning(false);
		if (curr === 0) {
			// Jump to the real last slide (no animation)
			setCurr(slides.length);
			trackRef.current.style.transition = "none";
		} else if (curr === slides.length + 1) {
			// Jump to the real first slide (no animation)
			setCurr(1);
			trackRef.current.style.transition = "none";
		}
	};

	const prev = () => {
		if (isTransitioning || curr === 1) return; // Prevent going before first slide
		setIsTransitioning(true);
		setCurr((prev) => prev - 1);
	};

	const next = () => {
		if (isTransitioning || curr === slides.length) return; // Prevent going past last slide
		setIsTransitioning(true);
		setCurr((prev) => prev + 1);
	};

	// Apply transition on slide change
	useEffect(() => {
		if (!trackRef.current) return;

		// Enable smooth transition except when resetting position
		trackRef.current.style.transition = isTransitioning
			? "transform 0.5s ease"
			: "none";
		trackRef.current.style.transform = `translateX(calc(-${curr * 100}% - ${
			curr * 2
		}rem))`;
	}, [curr, isTransitioning]);

	return (
		<div className="relative">
			<div
				ref={trackRef}
				className="flex gap-8 items-center"
				onTransitionEnd={handleTransitionEnd}
			>
				{carouselSlides.map((slide, index) => (
					<div key={index} className="w-full flex-shrink-0">
						{slide}
					</div>
				))}
			</div>

			{!hideArrow ? (
				<div className="absolute -inset-4 z-[40] flex items-center justify-between">
					<button
						onClick={prev}
						className="p-1 rounded-full shadow bg-gray-400/60 text-gray-800"
						aria-label="Previous slide"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>

					<button
						onClick={next}
						className="p-1 rounded-full shadow bg-gray-400/60 text-gray-800"
						aria-label="Next slide"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>
				</div>
			) : (
				<>
					<div className="absolute top-0 text-xl py-1 px-4 bg-black/40 z-[40] flex items-center justify-between w-full ">
						<div className="flex items-center gap-8">
							00{curr}/00{slides.length}
							<div>
								<Icon
									icon={"game-icons:battery-75"}
									className="rotate-90 text-2xl
                                    "
								/>
							</div>
						</div>
						<div className="flex">
							<Icon
								icon={"tdesign:sim-card-2"}
								className="text-2xl
                                    "
							/>
							100-449{curr}
						</div>
					</div>
					<div className="absolute inset-0 z-[40] flex items-center justify-between">
						<button
							onClick={prev}
							className={`p-1 size-12 rounded-full ${
								curr === 1 ? "opacity-50 cursor-not-allowed" : ""
							}`}
							aria-label="Previous slide"
							disabled={curr === 1}
						>
							<Icon
								icon={"codicon:triangle-left"}
								className="w-full h-full text-[#CE4F3E] shadow-2xl stroke-1.5 stroke-[#FAF9DB]"
							/>
						</button>

						<button
							onClick={next}
							className={`p-1 size-12 rounded-full ${
								curr === slides.length ? "opacity-50 cursor-not-allowed" : ""
							}`}
							aria-label="Next slide"
							disabled={curr === slides.length}
						>
							<Icon
								icon={"codicon:triangle-right"}
								className="w-full h-full text-[#CE4F3E] shadow-2xl stroke-1.5 stroke-[#FAF9DB]"
							/>
						</button>
					</div>
					<div className="absolute bottom-0 text-xl py-1 px-4 bg-black/40 z-[40] flex items-center justify-between w-full ">
						<div className="flex w-full justify-around items-center gap-8">
							<div>1/320</div>
							<div>F8.0</div>
							<div className="flex items-center">
								<Icon
									icon={"ic:baseline-iso"}
									className=" text-2xl
                                    "
								/>
								<div>-⅓</div>
							</div>
							<div className="flex items-center">
								<Icon icon={"carbon:iso-filled"} className="text-2xl  " />
								<div>100</div>
							</div>
							<div className="flex items-center px-4">
								<Icon icon={"carbon:raw"} className="text-2xl  " />
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
