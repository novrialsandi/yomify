import { useState, useEffect, useRef } from "react";

export default function Carousel({ children: slides }) {
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
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurr((prev) => prev - 1);
	};

	const next = () => {
		if (isTransitioning) return;
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

			<div className="absolute -inset-4 z-10 flex items-center justify-between">
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
		</div>
	);
}
